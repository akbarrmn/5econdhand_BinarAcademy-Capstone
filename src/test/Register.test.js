import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Register from "../components/auth/Register"
import '@testing-library/jest-dom'
import store from "../redux/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

test("rendering register placeholder input name register", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/john doe/i);
    expect(emailInput).toBeInTheDocument();
  });

test("rendering register placeholder input email register", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/johndoe@gmail.com/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("rendering register placeholder input password", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const passwordInput = screen.getByPlaceholderText(/masukkan password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("name input register should be empty", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/john doe/i);
    expect(emailInput.value).toBe("");
  });

  test("email input register should be empty", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/johndoe@gmail.com/i);
    expect(emailInput.value).toBe("");
  });
  
  test("password input register should be empty", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const passwordInput = screen.getByPlaceholderText(/masukkan password/i);
    expect(passwordInput.value).toBe("");
  });
  
  test("name input register should change", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/johndoe@gmail.com/i);
    const testValue = "test";
  
    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe(testValue);
  });

  test("email register input should change", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const emailInput = screen.getByPlaceholderText(/johndoe@gmail.com/i);
    const testValue = "test";
  
    fireEvent.change(emailInput, { target: { value: testValue } });
    expect(emailInput.value).toBe(testValue);
  });
  
  test("password register input should change", () => {
    render(<Provider store={store}><BrowserRouter >
      <Register /></BrowserRouter></Provider>);
    const passwordInput = screen.getByPlaceholderText(/masukkan password/i);
    const testValue = "test";
  
    fireEvent.change(passwordInput, { target: { value: testValue } });
    expect(passwordInput.value).toBe(testValue);
  });