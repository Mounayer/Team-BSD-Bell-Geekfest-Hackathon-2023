import { useForm } from "react-hook-form";
import { getUser } from "@/src/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from "react";

export default function Form() {
  // retrieves the following properties and member functions from useForm
  const { register, handleSubmit } = useForm({
    defaultValues: {
      payload: "",
      title: "",
    },
  });

  const [title, setTitle] = useState("");

  // Check if the input should be text or an image file
  const [isText, setIsText] = useState(true);

  const fileInput = useRef();

  const [data, setData] = useState(null);
  const [Location, setLocation] = useState(null);
  const [userName, setUserName] = useState("");
  const [isImage, setIsImage] = useState(false);

  const router = useRouter();

  // Simple callback to go back to root
  function goHome() {
    router.push("/");
  }

  const [selectedOption, setSelectedOption] = useState("text/plain");
  const [selectedContentType, setSelectedContentType] = useState("");

  //   const handleChange = (event) => {
  //     setSelectedOption(event.target.value);
  //     // Update isText based on the selected option
  //     const imageTypes = ["image/jpeg", "image/gif", "image/png", "image/webp"];
  //     setIsText(!imageTypes.includes(event.target.value));
  //   };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setSelectedContentType(event.target.value);

    const imageTypes = ["image/jpeg", "image/gif", "image/png", "image/webp"];

    // Check if it's one of the image MIME types
    setIsImage(imageTypes.includes(event.target.value));

    // Set isText only if it's a text or application/json
    setIsText(
      event.target.value.startsWith("text/") ||
        event.target.value === "application/json"
    );

    // Clear the file input if it exists
    if (fileInput.current) {
      fileInput.current.value = "";
      setSelectedContentType("");
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length === 0) return;

    const fileExtension = event.target.files[0].name.split(".").pop();

    switch (fileExtension) {
      case "jpeg":
      case "jpg":
        setSelectedContentType("image/jpeg");
        break;
      case "png":
        setSelectedContentType("image/png");
        break;
      case "gif":
        setSelectedContentType("image/gif");
        break;
      case "webp":
        setSelectedContentType("image/webp");
        break;
      default:
        setSelectedContentType("application/octet-stream");
    }
  };

  if (selectedOption === "application/octet-stream" && !selectedContentType) {
    setSelectedContentType("application/octet-stream");
  }
  // Callback function to handleSubmit
  async function whatToDo(data, event) {
    event.preventDefault();
    // const to_send =
    //   selectedContentType == "application/json"
    //     ? JSON.stringify({ message: data["payload"] })
    //     : data["payload"];
    let to_send = data["payload"];
    console.log(`selectedContentType: ${selectedContentType}`);
    if (selectedContentType === "application/json") {
      try {
        console.log(`Logging to_send ${to_send}`);
        //to_send = JSON.stringify(JSON.parse(data["payload"]));
        to_send = JSON.stringify({ message: to_send });

        console.log(`Logging to_send after json convert ${to_send}`);
      } catch (e) {
        console.error("Invalid JSON input:", e);
        return; // or handle this error in a user-friendly way
      }
    }

    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "localhost:8080";

    // Extracting token from authenticated user
    let idToken;
    try {
      idToken = (await getUser()).idToken;
      let username = (await getUser()).username;
      apiUrl =
        "https://" + apiUrl + `/add?username=${username}&filename=${title}`;
      setUserName(username);
    } catch (err) {
      console.log(err);
    }

    // Handle POST if new fragment is an image
    if (idToken && fileInput.current?.files[0]) {
      const file = fileInput.current.files[0];
      const fileExtension = "." + file.name.split(".").pop();
      const reader = new FileReader();
      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const fileData = new Blob([arrayBuffer]);
        if (selectedContentType.startsWith("text")) {
          apiUrl += ".txt";
        } else {
          apiUrl += fileExtension;
        }

        fetch(apiUrl, {
          method: "POST",
          body: fileData,
          headers: {
            "Content-Type": selectedContentType,
            Authorization: `Bearer ${idToken}`,
          },
        })
          .then((response) => {
            setLocation(response.headers.get("Location"));
            return response.json();
          })
          .then((res) => {
            setData(res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      reader.readAsArrayBuffer(file);
    }
    // Handle POST if new fragment is either text or application/json
    else if (idToken) {
      fetch(apiUrl, {
        method: "POST",
        body: to_send,
        headers: {
          "Content-Type": selectedOption,
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((response) => {
          setLocation(response.headers.get("Location"));
          return response.json();
        })
        .then((res) => {
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="centered w-full h-screen bg-blue-800 text-white">
        <h1 className="text-2xl text-center">
          Secure Your Information (feels a bit off centered maybe because of
          scroll bar)
        </h1>

        <div className="px-5">
          <label
            for="countries"
            className="block mb-2 text-sm font-medium text-white"
          >
            Information Type
          </label>
          <select
            value={selectedOption}
            onChange={handleChange}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="text/plain">Text</option>
            <option value="application/json">application/json</option>
            <option value="image/jpeg">Image</option>
            <option value="application/octet-stream">Files</option>
          </select>
        </div>

        <form onSubmit={handleSubmit(whatToDo)}>
          <br />
          <div className="px-5">
            <div className="mb-6">
              <label
                for="default-input"
                className="block mb-2 text-sm font-medium text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="default-input"
                {...register("title")}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-72 p-2.5"
              />
            </div>
          </div>
          {/* <h2>Data: </h2>
        {isText ? (
          <input type="text" {...register("payload")}></input>
        ) : (
          <input
            type="file"
            name="file"
            ref={fileInput}
            accept={selectedOption}
          ></input>
        )} */}
          <label
            for="default-input"
            className="block mb-2 text-sm font-medium text-white px-5"
          >
            Data
          </label>
          {isText ? (
            <>
              <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm m-5">
                <h1 className="text-center text-xl italic col-span-6 text-black">
                  Write Something
                </h1>
                <div className="flex justify-center col-span-6 px-5 py-3">
                  <textarea
                    type="text"
                    {...register("payload")}
                    placeholder="Whatever your heart desires..."
                    className="bg-slate-100 text-slate-600 h-28 w-screen placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600"
                  ></textarea>
                </div>
              </div>
            </>
          ) : // <input type="text" {...register("payload")} />
          isImage ? (
            <div className="px-5">
              <input
                type="file"
                name="file"
                ref={fileInput}
                accept=".gif, .jpeg, .jpg, .png, .webp"
                onChange={handleFileChange}
                className="block w-90 text-lg text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
              />
              <p
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="file_input_help"
              >
                PNG, JPG ,GIF or WEBP
              </p>
            </div>
          ) : (
            <div className="px-5">
              <input
                type="file"
                name="file"
                ref={fileInput}
                className="block w-90 text-lg text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>
          )}
          <br /> <br />
          <div className="px-5 ">
            <button
              type="submit"
              className="w-64 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Submit
            </button>
          </div>
        </form>
        {data && (
          <>
            <h2>Server Response</h2>
          </>
        )}
      </div>
    </>
  );
}
