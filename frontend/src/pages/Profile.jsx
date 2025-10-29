// import React, { useEffect, useState } from "react";
// import { useMeQuery, useUpdateMeMutation } from "../features/auth/authApi";
// import { useDispatch } from "react-redux";
// import { patchMe } from "../features/auth/authSlice";
// import { UserCircle2, UploadCloud, Save } from "lucide-react";

// export default function Profile() {
//     const { data, isFetching } = useMeQuery();
//     const [name, setName] = useState("");
//     const [file, setFile] = useState(null);
//     const [updateMe, { isLoading }] = useUpdateMeMutation();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         if (data) setName(data.name || "");
//     }, [data]);

//     const submit = async (e) => {
//         e.preventDefault();
//         const form = new FormData();
//         form.append("name", name);
//         if (file) form.append("avatar", file);
//         const res = await updateMe(form).unwrap();
//         dispatch(patchMe(res));
//     };

//     if (isFetching)
//         return (
//             <div className="flex items-center justify-center h-64">
//                 <p className="text-gray-500">Loading profile...</p>
//             </div>
//         );

//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
//             <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
//                 <h2 className="text-3xl font-extrabold mb-6 text-gray-800 flex items-center gap-2">
//                     <UserCircle2 className="text-indigo-600" />
//                     My Profile
//                 </h2>

//                 <form onSubmit={submit} className="space-y-5">
//                     {/* Avatar Section */}
//                     <div className="flex items-center gap-5">
//                         {data?.avatar ? (
//                             <img
//                                 src={`http://localhost:5000${data.avatar}`}
//                                 alt="Profile Avatar"
//                                 className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-md"
//                             />
//                         ) : (
//                             <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full border-2 border-gray-200 text-gray-400">
//                                 <UserCircle2 size={40} />
//                             </div>
//                         )}

//                         {/* Upload Avatar Button */}
//                         <label className="cursor-pointer flex flex-col items-center justify-center bg-indigo-50 border border-dashed border-indigo-300 text-indigo-600 text-sm font-medium rounded-xl px-4 py-3 hover:bg-indigo-100 transition">
//                             <UploadCloud size={18} className="mb-1" />
//                             Upload New
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={(e) => setFile(e.target.files?.[0] || null)}
//                             />
//                         </label>
//                     </div>

//                     {/* Name Field */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                             Full Name
//                         </label>
//                         <input
//                             className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
//                             placeholder="Your Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {/* Email (read-only) */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                             Email
//                         </label>
//                         <input
//                             className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
//                             value={data?.email || ""}
//                             disabled
//                         />
//                     </div>

//                     {/* Save Button */}
//                     <button
//                         disabled={isLoading}
//                         className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-all disabled:opacity-60"
//                     >
//                         <Save size={18} />
//                         {isLoading ? "Saving..." : "Save Changes"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }











import React, { useEffect, useState } from "react";
import { useMeQuery, useUpdateMeMutation } from "../features/auth/authApi";
import { useDispatch } from "react-redux";
import { patchMe, logout } from "../features/auth/authSlice";
import { UserCircle2, UploadCloud, Save, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { data, isFetching } = useMeQuery();
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [updateMe, { isLoading }] = useUpdateMeMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) setName(data.name || "");
    }, [data]);

    const submit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", name);
        if (file) form.append("avatar", file);
        const res = await updateMe(form).unwrap();
        dispatch(patchMe(res));
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    if (isFetching)
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-extrabold text-gray-800 flex items-center gap-2">
                        <UserCircle2 className="text-indigo-600" />
                        My Profile
                    </h2>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow transition-all"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-5">
                        {data?.avatar ? (
                            <img
                                src={`http://localhost:5000${data.avatar}`}
                                alt="Profile Avatar"
                                className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow-md"
                            />
                        ) : (
                            <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full border-2 border-gray-200 text-gray-400">
                                <UserCircle2 size={40} />
                            </div>
                        )}

                        {/* Upload Avatar Button */}
                        <label className="cursor-pointer flex flex-col items-center justify-center bg-indigo-50 border border-dashed border-indigo-300 text-indigo-600 text-sm font-medium rounded-xl px-4 py-3 hover:bg-indigo-100 transition">
                            <UploadCloud size={18} className="mb-1" />
                            Upload New
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                        </label>
                    </div>

                    {/* Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Full Name
                        </label>
                        <input
                            className="w-full border border-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            className="w-full border border-gray-200 p-3 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                            value={data?.email || ""}
                            disabled
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-all disabled:opacity-60"
                    >
                        <Save size={18} />
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
}