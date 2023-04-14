import { render, screen } from "@testing-library/vue";
import BaseButton from "./BaseButton.vue";
import { describe, it, expect } from "vitest";

describe("BaseButton", () => {
  it("should render", () => {
    render(BaseButton, {
      slots: {
        default: "Awesome",
      },
    });

    screen.getByText("Awesome");
  });

  it("should render with different accent", () => {
    render(BaseButton, {
      props: {
        variant: "secondary",
      },
      slots: {
        default: "Awesome",
      },
    });

    screen.getByText("Awesome");
    expect(screen.getByTestId("base-button").getAttribute("class")).toContain(
      "secondary"
    );
  });
});
