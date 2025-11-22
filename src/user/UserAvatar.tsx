export default function UserAvatar({ src, size = 60 }) {
  return (
    <img
      src={src || "https://via.placeholder.com/150"}
      className="rounded-full"
      style={{ width: size, height: size }}
    />
  );
}
