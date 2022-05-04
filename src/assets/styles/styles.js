const CategoryWrapperBlur = {
  width: "100vw",
  height: "auto",
  padding: "0 15%",
  margin: "0 auto",
  backgroundColor: "#fff",
  filter: "brightness(0.8) blur(1px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  pointerEvents: "none"
};

const CategoryWrapper = {
  width: "100vw",
  height: "auto",
  padding: "0 15%",
  margin: "0 auto",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between"
};

const ProductPageWrapper = {
  width: "100vw",
  height: "auto",
  padding: "0 15%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column"
};

const ProductPageWrapperBlur = {
  filter: "blur(1px)",
  width: "100vw",
  height: "auto",
  padding: "0 15%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  pointerEvents: "none"
};

export const styles = {
  CategoryWrapperBlur: CategoryWrapperBlur,
  CategoryWrapper: CategoryWrapper,
  ProductPageWrapper: ProductPageWrapper,
  ProductPageWrapperBlur: ProductPageWrapperBlur
};
