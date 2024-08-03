import { useEffect, useState } from 'react';
import './PostBlog.css'; 
const Form = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("user");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);

            // Initialize formData with author only after userData is available
            setFormData((prevFormData) => ({
                ...prevFormData,
                author: parsedData.user.id, // Set the author after parsing userData
            }));
        }
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        img: '',
        category: 'Mental-Health',
        summary: '',
        content: '',
        draft: false, // Initialize as false
        author: '', // Initially empty, set later based on userData
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://banaw-tec-backend.onrender.com/api/blogs/blog/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
            window.location.reload();
            // Handle successful submission (e.g., redirect or show a message)
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <h1>Write a blog here...</h1>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="img">Image URL</label>
                <input
                    type="text"
                    id="img"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="Mental-Health">Mental-Health</option>
                    <option value="Heart-Decease">Heart-Decease</option>
                    <option value="Covid-19">Covid-19</option>
                    <option value="Immunization">Immunization</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="summary">Summary</label>
                <textarea
                    id="summary"
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    rows="4"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows="6"
                    required
                />
            </div>

            <div className="form-group">
                <label>
                    <input
                        type="checkbox"
                        name="draft"
                        checked={formData.draft}
                        onChange={handleChange}
                    />
                     Don't Publish
                </label>
            </div>

            <button type="submit" className="submit-button">Submit</button>
        </form>
    );
};

export default Form;
