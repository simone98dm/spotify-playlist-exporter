import { render, screen } from "@testing-library/vue";
import Loading from "./Loading.vue";
import { describe, it, expect } from "vitest";

describe("Loading", () => {
  it("should render", () => {
    render(Loading);

    screen.getByTestId("loading");
  });
});
