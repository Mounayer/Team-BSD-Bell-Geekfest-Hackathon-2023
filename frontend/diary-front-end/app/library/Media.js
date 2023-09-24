// import Text from "@/src/components/mediaThumbnail/Text";
// import React from "react";
// import Picture from "@/src/components/mediaThumbnail/Picture";
// import useUser from "@/src/hooks/useUser";
// import Video from "@/src/components/mediaThumbnail/video";
// import { useState } from "react";
// import { useEffect } from "react";

// const Media = ({ media }) => {
//   const [open, setOpen] = useState(false);

//   const onOpenModal = () => setOpen(true);
//   const onCloseModal = () => setOpen(false);
//   const user = useUser();
//   const fileURL = user
//     ? `https://${process.env.NEXT_PUBLIC_API_URL}/getone?filename=${media.file_name}&dataType=${media.data_type}&contentType=${media.content_type}`
//     : null;
//   const [blobURL, setBlobURL] = useState(null);
//   const onClickHandler = getOnClickHandler();
//   const [blob, setBlob] = useState(null);

//   function handleBlobClick() {
//     if (blob) {
//       const a = document.createElement("a");
//       a.href = blob;
//       a.download = media.file_name;
//       a.click();
//       URL.revokeObjectURL(blob); // Free up memory
//     }
//   }

//   useEffect(() => {
//     if (fileURL && user && media) {
//       fetch(fileURL, {
//         headers: {
//           Authorization: `Bearer ${user.idToken}`,
//           "Content-Type": media.content_type,
//         },
//       })
//         .then((res) => res.blob())
//         .then((downloadedBlob) => {
//           if (downloadedBlob.size > 0) {
//             // Check if blob is not empty
//             const url = URL.createObjectURL(downloadedBlob);
//             setBlob(url);
//           } else {
//             console.error("Received empty blob");
//           }
//         })
//         .catch((err) => console.log(err.message));
//     }
//   }, [fileURL, user]);

//   return (
//     <div
//       onClick={onClickHandler}
//       className=" flex mx-5 my-3 cursor-pointer flex-col border-black border w-[140px] h-[220px]"
//     >
//       <div className=" h-full flex justify-center items-center">
//         {getMediaThumbnail()}
//       </div>
//       <div className="p-2 max-h-16 bg-black bg-opacity-25 text-white opacity-90 text-center text-sm">
//         <h2 className="truncate max-w-full">{media.file_name}</h2>
//       </div>
//     </div>
//   );

//   function downloadBlob(blob, fileName) {
//     const blobURL = URL.createObjectURL(blob);
//     const tempLink = document.createElement("a");

//     tempLink.href = blobURL;
//     tempLink.setAttribute("download", fileName);
//     tempLink.setAttribute("target", "_blank");
//     document.body.appendChild(tempLink);

//     tempLink.click();
//     document.body.removeChild(tempLink);
//   }

//   function getOnClickHandler() {
//     if (media.data_type === "image" && blobURL) {
//       return () => window.open(blobURL, "_blank");
//     }
//     if (
//       media.data_type === "text" ||
//       (media.data_type === "file" && media.file_extension === "mp4")
//     ) {
//       return () => blob && downloadBlob(new Blob([blob]), media.file_name);
//     }
//     return handleBlobClick;
//   }

//   function getMediaThumbnail() {
//     if (media.data_type == "text") {
//       return <Text fileExtension={media.file_extension} />;
//     }
//     if (media.data_type == "image") {
//       return (
//         <Picture
//           fileURL={fileURL}
//           media={media}
//           onBlobURLCreated={setBlobURL}
//         />
//       );
//     }
//     if (media.data_type == "file" && media.file_extension == "mp4") {
//       return <Video fileURL={fileURL} media={media} />;
//     }
//   }
// };

// export default Media;
import Text from "@/src/components/mediaThumbnail/Text";
import React from "react";
import Picture from "@/src/components/mediaThumbnail/Picture";
import useUser from "@/src/hooks/useUser";
import Video from "@/src/components/mediaThumbnail/video";
import File from "@/src/components/mediaThumbnail/File";
import { useState } from "react";
import { useEffect } from "react";

const Media = ({ media }) => {
  const user = useUser();
  const fileURL = user
    ? `https://${process.env.NEXT_PUBLIC_API_URL}/getone?filename=${media.file_name}&dataType=${media.data_type}&contentType=${media.content_type}`
    : null;
  const onClickHandler = getOnClickHandler();

  function handleBlobClick(url) {
    if (url) {
      const a = document.createElement("a");
      a.href = url;
      a.download = media.file_name;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <div
      onClick={onClickHandler}
      className=" flex mx-5 my-3 cursor-pointer flex-col border-black border w-[140px] h-[220px]"
    >
      <div className=" h-full flex justify-center items-center">
        {getMediaThumbnail()}
      </div>
      <div className="p-2 max-h-16 bg-black bg-opacity-25 text-white opacity-90 text-center text-sm">
        <h2 className="truncate max-w-full">{media.file_name}</h2>
      </div>
    </div>
  );

  function getOnClickHandler() {
    return () => {
      if (user) {
        fetch(fileURL, {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
            "Content-Type": media.content_type,
          },
        })
          .then((res) => res.blob())
          .then((downloadedBlob) => {
            if (downloadedBlob.size > 0) {
              // Check if blob is not empty
              const url = URL.createObjectURL(downloadedBlob);
              handleBlobClick(url);
            } else {
              console.error("Received empty blob");
            }
          })
          .catch((err) => console.log(err.message));
      }
    };
  }

  function getMediaThumbnail() {
    if (media.data_type == "text") {
      return <Text fileExtension={media.file_extension} />;
    }
    if (media.data_type == "image") {
      return <Picture fileURL={fileURL} media={media} />;
    }
    if (media.data_type == "file" && media.file_extension == "mp4") {
      return <Video fileURL={fileURL} media={media} />;
    }
    return <File fileURL={fileURL} media={media} />;
  }
};

export default Media;