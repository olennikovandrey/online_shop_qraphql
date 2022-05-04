import { GET_PRODUCT, GET_PRODUCTS_BY_CATEGORY } from "./queries";
import client from "../apollo";

export const getAllAttributes = (attr0, firstAttr, attr1, secondAttr, attr2, thirdAttr) => {
  if (attr0 && firstAttr.length !== 0 &&
        !attr1 && secondAttr.length === 0 &&
        !attr2 && thirdAttr.length === 0) {
    return true;
  } else if (attr0 && firstAttr.length !== 0 &&
        attr1 && secondAttr.length !== 0 &&
        !attr2 && thirdAttr.length === 0) {
    return true;
  } else if (attr0 && firstAttr.length !== 0 &&
        attr1 && secondAttr.length !== 0 &&
        attr2 && thirdAttr.length !== 0) {
    return true;
  } else if (!attr0 && !firstAttr.length !== 0 &&
        !attr1 && !secondAttr.length !== 0 &&
        !attr2 && !thirdAttr.length !== 0) {
    return true;
  }
  else {
    return false;
  }
};

export const classChanger = (event, parent) => {
  const target = event.target;
  const attributeItemSize = parent.querySelectorAll(".size");
  const attributeItemColor = parent.querySelectorAll(".color-wrapper");

  if (target.attributes[0].value.includes("#") && target.classList.contains("color")) {
    for (let i = 0; i < attributeItemColor.length; i++) {
      attributeItemColor[i].classList.remove("color-wrapper-selected");
    }
    target.parentNode.classList.add("color-wrapper-selected");
  } else if (target.classList.contains("size")) {
    for (let i = 0; i < attributeItemSize.length; i++) {
      attributeItemSize[i].classList.remove("selected-size");
    }
    target.classList.add("selected-size");
  }
};

export const productLoader = async (id) => {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: { productId: id }
  } );
  return data;
};

export const loadCategoryDataAsync = async (categoryName) => {
  const { data } = await client.query(
    {query: GET_PRODUCTS_BY_CATEGORY,
      variables: { input: { title: categoryName } }
    } );
  return data;
};

export const createMarkup = (value) => {
  return { __html: value };
};
