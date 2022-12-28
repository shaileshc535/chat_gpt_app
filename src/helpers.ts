/*To escape the HTML tags and special characters*/
import { Attribute, ProductAttributeOption } from "./types";

export const escapeHtml = (unsafe) =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const validateEmail = (string) =>
  !!string.trim().match(/^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/i);

export const getImageUrl = (path) => env.API_URL + "images?imageName=" + path;

export const currency = (number) =>
  `$${Number(number)
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const getOptionByValue = (
  attribute: Attribute,
  value
): ProductAttributeOption => {
  return attribute.options?.find((o) => attribute.getOptionValue(o) === value);
};

export const convertStringToInches = (value: string) => {
  var inchesValue = 0;
  let valueStr = value.replace(/['"]/g, "");
  let valueStrArray = valueStr.split("-");
  if (valueStrArray.length === 0) {
    inchesValue = 0;
  } else if (valueStrArray.length === 1) {
    inchesValue = 12 * (Number(valueStrArray[0]) ?? 0);
  } else if (valueStrArray.length === 2) {
    inchesValue =
      12 * (Number(valueStrArray[0]) ?? 0) + (Number(valueStrArray[1]) ?? 0);
  }
  return inchesValue;
};

export const extractNumbers = (value: string = "") => {
  return Number(value.replace(/[^0-9.-]/g, ""));
};
