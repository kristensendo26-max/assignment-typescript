import { useOutletContext } from "react-router-dom";
import ProductList from "../components/ProductList";

export default function Home() {
  const { search } = useOutletContext<{ search: string }>();

  return (
    <div className="container">
      <ProductList search={search} />
    </div>
  );
}
