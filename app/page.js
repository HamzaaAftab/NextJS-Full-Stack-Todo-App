'use client'
import Todo from "@/Components/Todo";
import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
// import { Toast } from "react-toastify/dist/components";
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })

  const [todoData, setTodoData] =  useState([])

  const fetchTodos = async()=>{
      const response = await axios('/api');
      setTodoData(response.data.todos);
  }

  const deleteTodo = async(id)=>{
    const response = await axios.delete('/api', {
      params: {
        mongoId: id
      }
    });

    toast.success(response.data.msg);
    fetchTodos()
  }

  const updateTodo = async(id)=>{
    const response = await axios.put('/api', {},{
      params: {
        mongoId: id
      }
    });

    toast.success(response.data.msg);
    fetchTodos();
  }

  useEffect(()=>{
    fetchTodos();
  }, [])

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // api code
      const response = await axios.post('/api', formData);


      toast.success(response.data.msg);
      setFormData({
        title: "",
        description: "",
      })
      await fetchTodos();

    } catch (error) {
      toast.error('🦄 Error!!', {
        position: "top-right",
        autoClose: 5010,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    }
  }

  const onChangeHandler = (e) => {
    // setFormData({...formData, [e.target.name]: e.target.value });
    const name = e.target.name;
    const value = e.target.value;
    setFormData(form=>({...form,[name]:value}));
    console.log(formData);
    
  }
  
  
  
  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={5010}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
      <form onSubmit={onSubmitHandler} className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-10 px-2 mx-auto">
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          name="title"
          placeholder="Enter your title"
          className="px-4 py-3 border-2 w-full"
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          name="description"
          placeholder="Enter your Description"
          className="px-4 py-3 border-2 w-full mt-2"
        ></textarea>
        <button
          
          type="submit"
          className="bg-orange-600 py-3 mt-2 px-10 text-white mx-auto "
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-8 w-[60%] mx-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase bg-gray-300 text-red-900 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item,index)=>{
              return <Todo id={index} key={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} updateTodo={updateTodo} />
            })}
            
            
          </tbody>
        </table>
      </div>
    </>
  );
}
