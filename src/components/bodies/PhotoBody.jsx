export default function PhotoBody({ data }) {
  return (
    <figure>
      <img src={data.image} alt={data.alt} />
      <figcaption className="font-hand text-2xl font-semibold leading-tight">{data.caption}</figcaption>
    </figure>
  );
}
