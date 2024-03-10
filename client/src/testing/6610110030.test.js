import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
//import ax from "../../utils/config/ax";
import LoginPage from "../pages/LoginPage";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("LoginPage Component", () => {
  test("renders LoginPage component", () => {
    render(
      <Router>
        <LoginPage />
      </Router>
    );

    expect(screen.getByLabelText("Enter email")).toBeInTheDocument();
    expect(screen.getByLabelText("Enter email")).toBeInTheDocument();
  });

  test("submitting the form with valid data", async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <Router>
        <LoginPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("Enter email"), {
      target: { value: "std2@skillpp.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "741852" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        email: "std2@skillpp.com",
        password: "741852"
      });
    });

    expect(window.location.pathname).toBe("/");
  });
});
