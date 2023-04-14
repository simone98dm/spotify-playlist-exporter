import { render, screen } from "@testing-library/vue";
import BaseCard from "./BaseCard.vue";
import { describe, it, expect } from "vitest";

describe("BaseCard", () => {
  it("should render", () => {
    render(BaseCard, {
      slots: {
        default: "Awesome",
      },
    });

    screen.getByText("Awesome");
  });
});
