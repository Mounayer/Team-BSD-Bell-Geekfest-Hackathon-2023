import React from "react";
import Link from "next/link";

export default function CoolCard(props) {
  const CardContent = () => (
    <div
      className={`card ${props.className ? props.className : ""} ${
        props.id == "login" || props.id == "logout" ? "hidden" : ""
      }`}
      style={{
        width: "190px",
        height: "180px",
        background: "#07182E",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderRadius: "20px",
        cursor: "pointer", // Hand pointer cursor
        userSelect: "none", // Disable text selection
      }}
    >
      <h2
        style={{
          zIndex: 1,
          color: "white",
          fontSize: "2em",
        }}
      >
        {props.name}
      </h2>
    </div>
  );

  return (
    <div id={props.id}>
      {props.href ? (
        <Link href={props.href}>
          <CardContent />
        </Link>
      ) : (
        <CardContent />
      )}
      <style jsx global>{`
        .card {
          width: 190px;
          height: 254px;
          background: #07182e;
          position: relative;
          display: flex;
          place-content: center;
          place-items: center;
          overflow: hidden;
          border-radius: 20px;
        }

        .card::before {
          content: "";
          position: absolute;
          width: 100px;
          background-image: linear-gradient(
            180deg,
            rgb(27, 80, 159),
            rgb(48, 106, 192)
          );
          height: 130%;
          animation: rotBGimg 3s linear infinite;
          transition: all 0.2s linear;
        }
        .card::after {
          content: "";
          position: absolute;
          background: #1b6273;
          inset: 5px;
          border-radius: 15px;
        }
        @keyframes rotBGimg {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
