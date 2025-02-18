import { useState } from "react";
import axios from "axios";

const Form = () => {
    const [email, setEmail] = useState('');
    const [prn, setPrn] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [branch, setBranch] = useState(''); 
    const [memberCount, setMemberCount] = useState(0);
    const [members, setMembers] = useState([]); 
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle change in member count
    const handleMemberCountChange = (e) => {
        const count = parseInt(e.target.value, 10);
        setMemberCount(count);
        setMembers(Array.from({ length: count }, () => ({ prn: '', name: '' })));
    };

    // Handle change for individual member's data
    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...members];
        updatedMembers[index][field] = value;
        setMembers(updatedMembers);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const BackendUrl = 'http://localhost:5000';

        setIsSubmitting(true);

        try {
            const response = await axios.post(`${BackendUrl}/api/feedback`, {
                email,
                prn,
                topic,
                description,
                branch, 
                members,
            });

            if (response.status === 200) {
                alert('Form submitted successfully!');
                resetForm();
            } else {
                alert(`Failed to submit the form: ${response.data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Failed to submit feedback.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form values
    const resetForm = () => {
        setEmail('');
        setPrn('');
        setTopic('');
        setDescription('');
        setBranch('');
        setMemberCount(0);
        setMembers([]);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-6 w-full max-w-3xl "
            >
                <h1 className="text-2xl font-mono font-bold text-center mb-6 text-indigo-800">
                    Mini Project Detail
                </h1>


                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        College Email ID (Leader)
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
                        placeholder="Enter leader's email"
                        required
                    />
                </div>

                {/* PRN */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Leader PRN</label>
                    <input
                        type="text"
                        value={prn}
                        onChange={(e) => setPrn(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
                        placeholder="Enter leader's PRN"
                        required
                    />
                </div>

                {/* Topic */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Project Topic</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
                        placeholder="Enter project topic"
                        required
                    />
                </div>

                {/* Branch */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Branch</label>
                    <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="w-1/2 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-900 bg-indigo-50 text-black p-2 rounded"
                        required
                    >
                        <option value="">Select branch</option>
                        <option value="AIDS">AIDS</option>
                        <option value="CSE">CSE</option>
                        <option value="ECE">ECE</option>
                        <option value="AIML">AIML</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="EXTC">EXTC</option>
                        <option value="IT">IT</option>
                    </select>
                </div>

                {/* Member Count */}
                <div className="mb-4 mt-7">
                    <label className="block text-gray-700 font-medium mb-2">
                        Number of Team Members (Including Leader)
                    </label>
                    <select
                        value={memberCount}
                        onChange={handleMemberCountChange}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400  bg-indigo-50"
                        required
                    >
                        <option value={0}>Select number of members</option>
                        {[1, 2, 3, 4].map((count) => (
                            <option key={count} value={count}>
                                {count}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Project Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
                        placeholder="Enter project description"
                        rows="4"
                        required
                    />
                </div>

                {/* Dynamic Member Inputs */}
                {members.map((member, index) => (
                    <div key={index} className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">
                            Member {index + 1} PRN
                        </label>
                        <input
                            type="text"
                            value={member.prn}
                            onChange={(e) =>
                                handleMemberChange(index, 'prn', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            placeholder={`Enter Member ${index + 1} PRN`}
                            required
                        />
                        <label className="block text-gray-700 font-medium mt-2">
                            Member {index + 1} Name
                        </label>
                        <input
                            type="text"
                            value={member.name}
                            onChange={(e) =>
                                handleMemberChange(index, 'name', e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-900"
                            placeholder={`Enter Member ${index + 1} Name`}
                            required
                        />
                    </div>
                ))}

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 text-white font-medium rounded ${isSubmitting ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-900 hover:bg-indigo-950"}`}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-6 py-2 text-indigo-800 font-medium border border-indigo-800 rounded hover:bg-indigo-100"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
