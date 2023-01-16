import "./button.scss";

export function Button({ text, isPriority, id, action }) {
  const styleButton = isPriority == true ? "ButtonPriority" : "Button";
  return (
    <button className={`${styleButton} ${id}`} id={id} onClick={action}>
      {text}
    </button>
  );
}
