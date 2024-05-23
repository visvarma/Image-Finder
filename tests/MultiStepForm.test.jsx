import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import MultiStepForm from "../src/components/MultiStepForm";

// Mock components for each step
const Step1 = ({ onNextStep }) => (
  <div>
    <p>Step 1</p>
    <button onClick={onNextStep}>Next</button>
  </div>
);

const Step2 = ({ onNextStep, onPrevStep }) => (
  <div>
    <p>Step 2</p>
    <button onClick={onPrevStep}>Previous</button>
    <button onClick={onNextStep}>Next</button>
  </div>
);

const Step3 = ({ onPrevStep }) => (
  <div>
    <p>Step 3</p>
    <button onClick={onPrevStep}>Previous</button>
  </div>
);

describe("MultiStepForm", () => {
  let componentList;

  beforeEach(() => {
    componentList = [
      <Step1 key="step1" />,
      <Step2 key="step2" />,
      <Step3 key="step3" />,
    ];
  });

  it("renders the first step by default and navigates through steps", () => {
    render(<MultiStepForm componentList={componentList} />);

    // Verify Step 1 is rendered initially
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    // Move to Step 2
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    // Move to Step 3
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Step 3")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();

    // Move back to Step 2
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Step 2")).toBeInTheDocument();

    // Move back to Step 1
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });

  it("renders the step indicator buttons correctly", () => {
    render(<MultiStepForm componentList={componentList} />);

    const stepButtons = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !button.textContent.includes("Next") &&
          !button.textContent.includes("Previous")
      );
    expect(stepButtons).toHaveLength(3);

    stepButtons.forEach((button, index) => {
      expect(button).toHaveTextContent((index + 1).toString());
    });
  });

  it("updates the progress bar correctly", () => {
    render(<MultiStepForm componentList={componentList} />);

    const progressBar = screen.getByTestId("progress-bar");

    // Initially, the progress bar width should be 0%
    expect(progressBar).toHaveStyle("width: 0%");

    // Move to Step 2
    fireEvent.click(screen.getByText("Next"));
    expect(progressBar).toHaveStyle("width: 50%");

    // Move to Step 3
    fireEvent.click(screen.getByText("Next"));
    expect(progressBar).toHaveStyle("width: 100%");

    // Move back to Step 2
    fireEvent.click(screen.getByText("Previous"));
    expect(progressBar).toHaveStyle("width: 50%");

    // Move back to Step 1
    fireEvent.click(screen.getByText("Previous"));
    expect(progressBar).toHaveStyle("width: 0%");
  });

  it("handles step navigation using the step indicator buttons", () => {
    render(<MultiStepForm componentList={componentList} />);

    const stepButtons = screen
      .getAllByRole("button")
      .filter(
        (button) =>
          !button.textContent.includes("Next") &&
          !button.textContent.includes("Previous")
      );

    // Navigate directly to Step 3
    fireEvent.click(stepButtons[2]);
    expect(screen.getByText("Step 3")).toBeInTheDocument();

    // Navigate directly to Step 1
    fireEvent.click(stepButtons[0]);
    expect(screen.getByText("Step 1")).toBeInTheDocument();
  });
});
