import { GET_PRODUCT, GET_SHOP } from "./queries";
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
  const attributeItem = parent.querySelectorAll(".size");

  if (target.attributes[0].value.includes("#") && target.classList.contains("size")) {
    for (let i = 0; i < attributeItem.length; i++) {
      attributeItem[i].classList.remove("selected-color");
    }
    target.classList.add("selected-color");
  } else if (target.classList.contains("size")) {
    for (let i = 0; i < attributeItem.length; i++) {
      attributeItem[i].classList.remove("selected-size");
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

export const loadShopDataAsync = async () => {
  const { data } = await client.query({query: GET_SHOP} );
  return data;
};

export const createMarkup = (value) => {
  return { __html: value };
};
