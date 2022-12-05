export default function Page({ children, cool }) {
  return (
    <div>
      <h1>The Page Component</h1>
      <h2>{children}</h2>
      <p>{cool}</p>
    </div>
  );
}
