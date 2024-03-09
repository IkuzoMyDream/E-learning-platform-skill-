import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import SignUpPage from "../pages/SignUpPage";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("axios");

describe("SignUpPage Component", () => {
  test("renders SignUpPage component", () => {
    render(
      <Router>
        <SignUpPage />
      </Router>
    );

    expect(screen.getByLabelText("username")).toBeInTheDocument();
    expect(screen.getByLabelText("Firstname")).toBeInTheDocument();
    expect(screen.getByLabelText("Lastname")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm password")).toBeInTheDocument();
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
        <SignUpPage />
      </Router>
    );

    fireEvent.change(screen.getByLabelText("username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Firstname"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Lastname"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByLabelText("Confirm password"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByText("Sign up"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        username: "testuser",
        firstname: "John",
        lastname: "Doe",
        email: "test@example.com",
        password: "password",
        role: 4,
      });
    });

    expect(window.location.pathname).toBe("/login");
  });
});
