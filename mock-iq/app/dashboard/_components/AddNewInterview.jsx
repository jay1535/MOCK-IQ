"use client"
import React,{useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import {db} from '@/utils/db'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'




function AddNewInterview() {
    const [openDialog , setOpenDialog]= useState(false)
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExperience, setJobExperience] = useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const {user} =useUser();
    const  router = useRouter();



    const onSubmit= async (e)=>{
            setLoading(true);
              e.preventDefault();

              console.log(jobPosition,jobDesc,jobExperience);
              const InputPrompt = "Job Position :"+jobPosition+", Job Description: "+jobDesc+", Years of Experience:"+jobExperience+".Based on the given Job position, Job Dscription and Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" interview questions in json format. Give us question and answer on json field."
                const result = await chatSession.sendMessage(InputPrompt);
                const MockJsonResponse=( await result.response.text()).replace('```json','').replace('```','');
                console.log(JSON.parse(MockJsonResponse));
                setJsonResponse(MockJsonResponse);
            
                {
                  if(MockJsonResponse){
                const resp= await db.insert(MockInterview).values({
                  mockId:uuidv4(),
                  jsonMockResp:MockJsonResponse,
                  jobPosition:jobPosition,
                  jobDesc:jobDesc,
                  jobExperience:jobExperience,
                  createdBy:user?.primaryEmailAddress?.emailAddress ,
                  createdAt:moment().format('DD-MM-YYYY')
  
              }).returning({mockId:MockInterview.mockId});
              console.log("Insterted Id:",resp);
              if(resp){
                setOpenDialog(false);
                router.push('/dashboard/interview/'+resp[0]?.mockId)
              }
              }
            else{
            console.log("No Response");
            }}
       setLoading(false);
}


  return (
    <div>
      <div className='p-10 border rounded-lg  bg-slate-100 hover:scale-105 hover:shadow-md cursor-pointer transition-all' onClick={()=>setOpenDialog(true)}> 
        <h2 className='text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent className='max-w-2xl'>
    <DialogHeader>
      <DialogTitle className=' text-2xl'> Tell Us More About Your Job Interview.</DialogTitle>
      <DialogDescription>
     <form onSubmit={onSubmit}>
     <div>
        <h2>Add details about your job position / role , Job description and  years of experience</h2>
        <div className='text-xl mt-5 my-2'> 
            <label>Job Role/ Job Position</label>
            <Input placeholder="Ex. Full Stcak Developer" className='mt-7 my-3' required
            onChange={(event) => setJobPosition(event.target.value)}/>
        </div>
        <div className='text-xl mt-5 my-3'> 
            <label>Job Description/Tech Stack (In Short)</label>
            <Textarea placeholder="Ex.React, Angular, Node.js, MySQl..." className='mt-7 my-3' required
            onChange={(event) => setJobDesc(event.target.value)}/>
        </div>
        <div className='text-xl mt-5 my-2'> 
            <label>Years Of Experience</label>
            <Input placeholder="Ex. 2" type="number" className='mt-7 my-3' required
            onChange={(event) => setJobExperience(event.target.value)}/>
        </div>
     </div>
      <div className='flex gap-5 justify-end'> 
        <Button type="button"variant="ghost" onClick={()=>setOpenDialog(false)}>Cancel</Button>
        <Button type="submit" disabled={loading}>
          {loading?
          <><LoaderCircle className='animate-spin'/>Generating Questions..</>:'Start Interview'}</Button>
      </div>
      </form>
      </DialogDescription>

    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewInterview
