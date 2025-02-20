import { brachesTypes } from "@/types/branchesTypes";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const BranchesService = () => {
  const [branch, setBrach] = useState<brachesTypes[]>([]);

  useEffect(() => {
    const cachedBranches = localStorage.getItem("branches");
    if (cachedBranches) {
      setBrach(JSON.parse(cachedBranches));
    } else {
      const fetchBranch = async () => {
        try {
          const branchRef = collection(db, "branches");
          const branchData = await getDocs(branchRef);

          const branchesList = branchData.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: String(data.name || ""),
              coordinates: data.coordinates || [0, 0],
              description: data.description || "",
              phone: data.phone || "",
            };
          });
          setBrach(branchesList);
          localStorage.setItem("branches", JSON.stringify(branchesList));
        } catch (error) {
          console.log(error);
        }
      };

      fetchBranch();
    }
  }, []);

  return {
    branch,
  };
};
