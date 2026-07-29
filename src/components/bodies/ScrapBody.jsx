/** A keepsake tacked straight to the cork — no paper stock, no caption. The
    object is the whole content, so the markup is just the image. */
export default function ScrapBody({ data }) {
  return <img src={data.image} alt={data.alt} />;
}
