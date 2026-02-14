import { ZRouter } from "@zthun/fashion-boutique";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ZFashionApp } from "./app/app.js";

const container = createRoot(document.getElementById("zthunworks-fashion")!);

container.render(
  <StrictMode>
    <ZRouter>
      <ZFashionApp />
    </ZRouter>
  </StrictMode>,
);
