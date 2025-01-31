

import { brachesTypes } from "@/types/branchesTypes";
import { useState, useEffect } from "react";
import {collection, getDocs} from 'firebase/firestore'
import { db } from "@/utils/firebase";



export const BranchesData = () => {
    const [branch, setBrach] = useState<brachesTypes[]>([]);


    useEffect(() => {
            const fechBranch = async () => {
                try {
                    const branchRef = collection(db, 'branches');
                    const branchData = await getDocs(branchRef);

                    const branchesList = branchData.docs.map((doc) => {
                        const data = doc.data();

                        return {
                            id: doc.id,
                            name: data.name || '',
                            coordinates: data.coordinates || [0, 0],
                            description: data.description || '',
                            phone: data.phone || ''
                        }
                    });

                    setBrach(branchesList);
                    
                } catch (error) {
                    console.log(error)
                }
            }
            fechBranch()
    }, []);
    

    return {
        branch
    }
};