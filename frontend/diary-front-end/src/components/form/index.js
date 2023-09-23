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

  //   const handleChange = (event) => {
  //     setSelectedOption(event.target.value);
  //     // Update isText based on the selected option
  //     const imageTypes = ["image/jpeg", "image/gif", "image/png", "image/webp"];
  //     setIsText(!imageTypes.includes(event.target.value));
  //   };

  const handleChange = (event) => {
    setSelectedOption(event.target.value);

    // If the selected option is "image", treat it as an image
    setIsImage(event.target.value === "image");

    // Set isText only if it's a text or application/json
    setIsText(
      event.target.value.startsWith("text/") ||
        event.target.value === "application/json"
    );

    // Clear the file input if it exists
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const handleFileChange = (event) => {
    if (event.target.files.length === 0) return;

    if (isImage) {
      setSelectedOption("image");
    }
  };

  // Callback function to handleSubmit
  async function whatToDo(data, event) {
    event.preventDefault();

    const to_send =
      selectedOption == "application/json"
        ? JSON.stringify({ message: data["payload"] })
        : data["payload"];

    let apiUrl = process.env.NEXT_PUBLIC_API_URL || "localhost:8080";

    // Extracting token from authenticated user
    let idToken;
    try {
      idToken = (await getUser()).idToken;
      let username = (await getUser()).username;
      apiUrl =
        "http://" + apiUrl + `/add?username=${username}&filename=${title}`;
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
        if (selectedOption.startsWith("text")) {
          apiUrl += ".txt";
        } else {
          apiUrl += fileExtension;
        }

        fetch(apiUrl, {
          method: "POST",
          body: fileData,
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
    <div className="centered">
      <h1>Secure Your Information</h1>
      <h2>Information Type</h2>
      <div>
        <select value={selectedOption} onChange={handleChange}>
          <option value="text/plain">Text</option>
          <option value="application/json">application/json</option>
          <option value="image">Image</option>
          <option value="application/octet-stream">Any File</option>
        </select>
      </div>
      <form onSubmit={handleSubmit(whatToDo)}>
        <h2>Title: </h2>
        <input
          type="text"
          {...register("title")}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></input>
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
        <h2>Data: </h2>
        {isText ? (
          <input type="text" {...register("payload")} />
        ) : isImage ? (
          <input
            type="file"
            name="file"
            ref={fileInput}
            accept=".gif, .jpeg, .jpg, .png, .webp"
            onChange={handleFileChange}
          />
        ) : (
          <input type="file" name="file" ref={fileInput} />
        )}
        <br /> <br />
        <button type="submit">Submit</button> &nbsp;
        <button type="button" onClick={goHome}>
          Home
        </button>
      </form>
      <br></br>

      <br></br>
      {data && (
        <>
          <h2>Server Response</h2>
        </>
      )}
    </div>
  );
}
