import React from "react";

interface CardProps {
  title: string;
  content: string | JSX.Element;
  icon: JSX.Element;
  backgroundColor: string;
}

const Card: React.FC<CardProps> = ({ title, content, icon, backgroundColor }) => {
  return (
    <div className={`flex flex-col p-4 rounded-lg shadow-md ${backgroundColor}`}>
      <div className="flex items-center mb-4">
        <div className="text-2xl mr-2">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <div className="text-lg">{content}</div>
    </div>
  );
};

export default Card;
