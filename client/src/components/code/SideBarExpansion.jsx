import React, { useState } from "react";
import { useEffect } from "react";
import { FaFileCirclePlus, FaFolderPlus } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { readFolderApi } from "../../services/folder";
import { nanoid } from "nanoid";

const SideBarExpansion = () => {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    data: folderStructure,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["folders"],
    queryFn: () => readFolderApi(),
  });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }

    if (folderStructure) {
      setTree(folderStructure?.data);
      setLoading(false);
    }
  }, [folderStructure]);

  const addNode = (nodes, parentId, newNode) => {
    return nodes.map((node) => {
      if (node.id === parentId && node.type === "folder") {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      }

      if (node.children) {
        return {
          ...node,
          children: addNode(node.children, parentId, newNode),
        };
      }

      return node;
    });
  };

  const deleteNode = (nodes, id) => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: node.children ? deleteNode(node.children, id) : [],
          };
        }
      });
  };

  const createFile = (parentId = null) => {
    const name = prompt("Enter file name");
    if (!name) return;

    const newFile = {
      id: Date.now().toString(),
      name,
      type: "file",
    };

    if (!parentId) {
      setTree((prev) => [...prev, newFile]);
    } else {
      setTree((prev) => addNode(prev, parentId, newFile));
    }
  };

  const createFolder = (parentId = null) => {
    const name = prompt("Enter folder name");
    if (!name) return;

    const newFolder = {
      id: Date.now().toString(),
      name,
      type: "folder",
      children: [],
    };

    if (!parentId) {
      setTree((prev) => [...prev, newFolder]);
    } else {
      setTree((prev) => addNode(prev, parentId, newFolder));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this item?")) return;
    setTree((prev) => deleteNode(prev, id));
  };

  const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(true);

    return (
      <div style={{ marginLeft: "10px" }}>
        <div className="flex justify-between items-center group">
          <span
            onClick={() => node.type === "folder" && setExpanded(!expanded)}
            className="cursor-pointer"
          >
            {node.type === "folder" ? "📁" : "📄"} {node.name}
          </span>

          <div className="hidden group-hover:flex gap-2">
            {node.type === "folder" && (
              <>
                <button onClick={() => createFile(node.id)}>📄</button>
                <button onClick={() => createFolder(node.id)}>📁</button>
              </>
            )}

            <button onClick={() => handleDelete(node.id)}>🗑</button>
          </div>
        </div>

        {expanded &&
          node.children?.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
      </div>
    );
  };

  return (
    <div className="w-70 border-r border-[#2A2B2C] p-2 text-sm">
      <h1 className="mb-2 font-semibold">Explorer</h1>

      <div className="flex justify-between items-center mb-2">
        <span>Root</span>
        <div className="flex gap-3">
          <div onClick={() => createFile()} className="cursor-pointer">
            <FaFileCirclePlus size={16} />
          </div>
          <div onClick={() => createFolder()} className="cursor-pointer">
            <FaFolderPlus size={16} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {loading ? <h1>Loading...</h1> : ""}
        {tree.map((node) => (
          <TreeNode key={nanoid()} node={node} />
        ))}
      </div>
    </div>
  );
};

export default SideBarExpansion;
