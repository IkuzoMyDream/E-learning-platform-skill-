import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import MenuBarHeader from '../components/menu-bar-header';

// Mock useHistory
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn()
}));

describe('MenuBarHeader component', () => {
  test('redirects to "/" when the logo is clicked', () => {
    render(
      <Router>
        <MenuBarHeader />
      </Router>
    );

    fireEvent.click(screen.getByAltText("SkillPP"));

    expect(window.location.pathname).toBe("/");;
  });
});
