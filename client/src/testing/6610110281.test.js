import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddCoursePage from "../pages/admin/AddCoursePage";
import axios from "axios";

jest.mock("axios");

describe("AddCoursePage component", () => {
  test("onsubmit api to server and reload page", async () => {
    // Mock axios.post และ axios.get
    axios.post.mockResolvedValueOnce({ data: [{ id: 1 }] });
    axios.get.mockResolvedValueOnce({ data: [{ id: 1, name: "Category 1" }] });

    // เรียกใช้งาน component
    render(<AddCoursePage />);

    // กรอกข้อมูลในฟอร์ม
    fireEvent.change(screen.getByPlaceholderText("หัวข้อ"), { target: { value: "some body help" } });
    fireEvent.change(screen.getByPlaceholderText("คำอธิบาย"), { target: { value: "Help me pls" } });
    fireEvent.change(screen.getByLabelText("ราคา"), { target: { value: "999" } });
    fireEvent.change(screen.getByLabelText("ชื่อผู้สอน"), { target: { value: "teszzzzzzz" } });
    fireEvent.change(screen.getByPlaceholderText("อีเมลผู้สอน"), { target: { value: "TEaz@gmail.com" } });

    // กำหนดค่าของไฟล์ที่จะอัพโหลด
    const courseImgFile = new File(["courseImg"], "courseImg.jpg", { type: "image/jpeg" });
    const previewVdoFile = new File(["previewVdo"], "previewVdo.mp4", { type: "video/mp4" });

    // // เลือกไฟล์และเปลี่ยนค่า input
    // fireEvent.change(screen.getByLabelText("Upload Course Picture"), { target: { files: [courseImgFile] } });
    // fireEvent.change(screen.getByLabelText("Upload Course Preview"), { target: { files: [previewVdoFile] } });

    // กดปุ่ม 'เพิ่มคอร์ส'
    const addButton = screen.getByText("เพิ่มคอร์ส");
    fireEvent.click(addButton);

    // ตรวจสอบว่า axios.post ถูกเรียกใช้ด้วยข้อมูลที่ถูกต้องหรือไม่
    await waitFor(() => {
      // expect(axios.post).toHaveBeenCalledWith("/upload", expect.any(FormData));
      expect(axios.post).toHaveBeenCalledWith("/courses", expect.any(Object));
      // expect(axios.post).toHaveBeenCalledWith("/course-chapters", expect.any(Object));
      // expect(axios.post).toHaveBeenCalledWith("/materials", expect.any(Object));
    // });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/courses", {
        name: "some body help",
        description: "Help me pls",
        price: 999,
        instructor: "teszzzzzzz",
        instructorEmail: "TEaz@gmail.com",
        // courseImg: courseImgFile,
        // previewVdo: previewVdoFile,
      });
    });


  });
});
