import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import getCurrentUser from "@/actions/getCurrentUser";

interface IPrams {
  productId?: string;
}

const Product = async({ params }: { params: IPrams }) => {

  const product = await getProductById(params)
  const user = await getCurrentUser()

  if(!product) return <NullData title="Oops! Product with the given id does not exist"/>

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
      </Container>
    </div>
  );
};

export default Product;
