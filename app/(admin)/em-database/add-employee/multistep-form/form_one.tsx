'use client';

import { useEffect, useState } from 'react';

type FormProps = {
  formdata: Record<string, any>;
  updateFields: (data: Record<string, any>) => void;
  setStepValid: (data: boolean) => void;
};

// --------------------------
// PhoneInput Component
// --------------------------
function PhoneInput({ name, label, placeholder, value, onChange }: {
  name: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  function formatPhone(num: string) {
    num = num.replace(/\D/g, "");

    if (num.startsWith("234")) num = "+" + num;
    if (num.startsWith("0")) num = "+234" + num.slice(1);
    if (!num.startsWith("+234")) num = "+234" + num;

    const rest = num.replace("+234", "");

    const p1 = rest.slice(0, 3);
    const p2 = rest.slice(3, 6);
    const p3 = rest.slice(6, 10);

    let formatted = "+234";
    if (p1) formatted += " " + p1;
    if (p2) formatted += " " + p2;
    if (p3) formatted += " " + p3;

    return formatted;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value.replace(/[^\d+]/g, ""); // digits and plus only
    setLocalValue(val);
  }

  function handleBlur() {
    const formatted = formatPhone(localValue);
    setLocalValue(formatted);
    onChange(formatted);
  }

  return (
    <div className="my-4 w-full">
      {label && <label className="text-gray-600 font-medium block mb-1">{label}</label>}
      <input
        type="text"
        name={name}
        value={localValue}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className="border border-gray-300 rounded p-2 w-full outline-none focus:border-black"
        maxLength={16}
      />
    </div>
  );
}

// --------------------------
// Main FormOne Component
// --------------------------
export default function FormOne({ formdata, updateFields, setStepValid }: FormProps) {
  const requiredFields = [
    'name', 'address', 'faculty_college', 'email', 'gsm', 'dept',
    'dob', 'doa', 'post', 'doc', 'role', 'dopp', 'level'
  ];

  const [errors, setErrors] = useState<Record<string, string>>({});

  // --------------------------
  // Validation
  // --------------------------
  function validateField(name: string, value: string) {
    let error = "";

    if (!value.trim()) error = "This field is required.";

    if (name === "email" && value.trim()) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) error = "Enter a valid email address.";
    }

    if (name === "gsm" && value.trim()) {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 7 || digits.length > 15) error = "Phone number must be 7–15 digits.";
    }

    if (["dob", "doa", "doc", "dopp"].includes(name) && value.trim()) {
      const today = new Date().toISOString().split("T")[0];
      if (value > today) error = "Date cannot be in the future.";
    }

    setErrors(prev => ({ ...prev, [name]: error }));
  }

  // --------------------------
  // Handle Input Changes
  // --------------------------
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    updateFields({ [name]: value });
    validateField(name, value);
  }

  // --------------------------
  // Enable/Disable Next Button
  // --------------------------
  useEffect(() => {
    const allFilled = requiredFields.every(f => formdata[f]?.trim());
    const noErrors = Object.values(errors).every(err => err === "");
    setStepValid(allFilled && noErrors);
  }, [formdata, errors]);

  // --------------------------
  // Reusable Input Component
  // --------------------------
  const Input = ({ name, label, type = "text", placeholder }: { name: string; label: string; type?: string; placeholder?: string; }) => (
    <div className="formgroup flex flex-col my-2 w-full">
      <label className="my-2 text-sm">{label}</label>
      <input
        name={name}
        type={type}
        value={formdata[name] || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="font-light text-sm text-gray-500 placeholder-gray-300 py-3 px-6 outline-0 border rounded-sm focus:border-gray-400"
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="flex flex-col">
      {/* Row 1 */}
      <div className="flex pt-4">
        <div className="w-1/2 mx-8">
          <Input name="name" label="Employee's Full Name:" placeholder="Enter full name" />
          <Input name="address" label="Current Home Address:" placeholder="Home address" />
          <Input name="faculty_college" label="Faculty/College:" placeholder="Enter faculty" />
        </div>

        <div className="w-1/2 mx-8">
          <Input name="email" label="Employee's Email Address:" placeholder="Enter email" />
          <PhoneInput
            name="gsm"
            label="Phone Number:"
            placeholder="Enter phone number"
            value={formdata.gsm || ""}
            onChange={(v) => {
              updateFields({ gsm: v });
              validateField("gsm", v);
            }}
          />
          <Input name="dept" label="Department:" placeholder="Enter department" />
        </div>
      </div>

      {/* Row 2 - Dates */}
      <div className="w-[95%] mx-auto flex justify-between">
        <Input name="dob" label="Date of birth:" type="date" />
        <Input name="doa" label="Date of first appointment:" type="date" />
        <Input name="post" label="Post/grade of first appointment:" placeholder="Enter post" />
        <Input name="doc" label="Date of confirmation:" type="date" />
      </div>

      {/* Row 3 */}
      <div className="w-[80%] ms-8 me-auto mb-4 flex justify-between">
        <div className="formgroup flex flex-col">
          <label className="my-2 text-sm">Present post:</label>
          <select
            name="role"
            value={formdata.role || ""}
            onChange={handleChange}
            className="font-light text-sm text-gray-500 py-3 px-6 outline-0 border rounded-sm focus:border-gray-400"
          >
            <option value="" disabled>Select a role</option>
            <option value="lecturer">Employee Academic</option>
            <option value="industrial-engineer">Employee Non-Academic (industrial/production engineer)</option>
            <option value="hod">Department Lead</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
        </div>

        <Input name="dopp" label="Date appointed to present post:" type="date" />
        <Input name="level" label="Current level:" placeholder="Current level" />
      </div>

      {/* Qualifications Section */}
      <div className="w-[50%] ms-8 me-auto mb-4 flex flex-col">
        <p className='text-sm text-pes my-3'>
          Academic & Professional Qualifications held:
          <span className="text-gray-300"> (certificates must be attached)</span>
        </p>

        <div className="flex flex-col bg-gray-50 rounded-xs p-4">
          <div className="flex justify-between m-2">
            <input
              id="title"
              type="text"
              placeholder="Title or Qualification"
              className="font-light text-sm text-gray-500 py-3 px-6 border rounded-sm"
            />
            <select
              id="year"
              defaultValue=""
              className="font-light text-sm text-gray-500 py-3 px-6 border rounded-sm"
            >
              <option value="">Year Obtained</option>
            </select>
          </div>

          <div className="flex justify-between m-2">
            <label htmlFor="file" className="w-[80%] my-auto">
              <div className="flex justify-end bg-white rounded-sm w-11/12 relative cursor-pointer">
                <p className="m-auto text-sm text-gray-300">Choose File to Upload</p>
                <div className="bg-gray-100 rounded-sm px-5 py-3 text-sm text-gray-500">Browse Files</div>
              </div>
              <input id="file" type="file" className="hidden" />
            </label>
            <button className="border border-pes rounded-sm text-pes py-2 px-6">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
