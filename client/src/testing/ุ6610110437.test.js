import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import StudyPage from "../pages/student/StudyPage";
import axios from "axios";

jest.mock("axios");

describe("StudyPage component", () => {
    test("render studyPage", () => {
        render(
            <MemoryRouter>
                <StudyPage />
            </MemoryRouter>
        );
        expect(screen.getByText("Study")).toBeInTheDocument();
        expect(screen.getByRole("video")).toBeInTheDocument();
    });

    test("video controls work", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));
        
        const { getByText } = render(
            <MemoryRouter>
                <StudyPage />
            </MemoryRouter>
        );

        fireEvent.click(getByText("Play"));
        expect(screen.getByRole("video")).toHaveAttribute("playing");

        fireEvent.click(getByText("Pause"));
        expect(screen.getByRole("video")).not.toHaveAttribute("playing");
    });
});
