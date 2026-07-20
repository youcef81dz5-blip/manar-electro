import { defineMcp } from "@lovable.dev/mcp-js";
import listProducts from "./tools/list-products";
import listTvApps from "./tools/list-tv-apps";
import listServices from "./tools/list-services";
import getContactInfo from "./tools/get-contact-info";

export default defineMcp({
  name: "manar-electro-mcp",
  title: "Manar Electro",
  version: "0.1.0",
  instructions:
    "Public tools for the Manar Electro shop (Béchar, Algeria): browse products, TV apps, services, and get contact/location info. All data is read-only and public.",
  tools: [listProducts, listTvApps, listServices, getContactInfo],
});
