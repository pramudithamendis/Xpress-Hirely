import express from "express";
import { chatModel } from "../models/chatModel.js";
import { replyModel } from "../models/replyModel.js";

const router = express.Router();

router.post('/create', async (request,response)=>{
    try {
        if(
            !request.body.title ||
            !request.body.vehicle ||
            !request.body.issue 
        ){
            return response.status(400).send('Send all the required fields');
        }

        const newChat = {
            title: request.body.title,
            vehicle: request.body.vehicle,
            issue: request.body.issue,
            user: request.body.user,
        }

        const chat = await chatModel.create(newChat);
        return response.status(201).send(chat);
    } catch (error) {
        
    }
})

router.get('/chats', async (request,response)=>{
    try {
        const all = await chatModel.find({});
        return response.status(200).json(all);
        
    } catch (error) {
        
    }
})

router.get('/chats/:user', async (request,response)=>{
    try {
        
        const {user} = request.params;

        const allchats = await chatModel.find({});
        
        

        const chatids = []

        for (let i = 0; i < allchats.length; i++) {
            if(allchats[i].user == user){
                chatids.push(allchats[i]._id)
            }
            else{
                continue;
            }
        }

        // console.log(chatids)


        const forrid2 = []

       
   
        const as2 = []

        if(chatids.length != 0){
            
            let size = chatids.length

            for(let k=0; k<size; k++){
                const as = await chatModel.findById(chatids[k])

                    if(k==1){
                    console.log(as)
                    }
                as2.push(as)
            }
            // console.log(as2)
        }else{
            
            as2.push(
                
                {
                    "_id": "",
                    "title": "hi",
                    "vehicle": "",
                    "issue": "",
                    "user": " ",
                    "createdAt": "",
                    "updatedAt": "",
                    "__v": 0
                }
                
            )
            // console.log(as2)
        }
    

        return response.status(200).json(as2);
        
    } catch (error) {
        
    }
})

router.delete('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await chatModel.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).json({ message: 'Chat not found' })
        }
        return response.status(200).send({ message: 'Chat deleted successfully' });
        
    } catch (error) {
        
    }
})

router.get('/getchat/:id', async (request, response) => {

    try {
        const { id } = request.params;
        const as= await chatModel.findById(id);
        return response.status(200).json(as);

    } catch (error) {
        
    }
})



router.put('/edit/:id', async (request, response) => {

    try {
        if (
            !request.body.title ||
            !request.body.vehicle ||
            !request.body.issue
        ) {
            return response.status(400).send({
                message: 'Send all the required fields FOR THE UPDATING'
            })
        }
         const { id } = request.params;
        const result = await chatModel.findByIdAndUpdate(id, request.body)
        if (!result) {
            return response.status(404).json({
                message: 'Chat not found'
            })
        }
        return response.status(200).send({
            message: 'Chat updated successfully'
        })


    } catch (error) {
        
    }
})


router.post('/create/admin/', async (request,response)=>{
    try {

        const newChat = {
            title: request.body.title,
            issueid: request.body.issueid
        }

        const chat = await replyModel.create(newChat);
        return response.status(201).send(chat);
    } catch (error) {
        
    }
})

router.get('/getchat/:id/reply', async (request, response) => {
 
    try {
        
        //
        const {id} = request.params;

        //findAll part comes here.(see bottom for it)
        ////////////////////////////
        //Method 1
        // const allreplies = await replyModel.findAll({
        //     where: {
        //       issueid: id,
        //     },
        //   });

        //Method 2
        const allreplies = await replyModel.find({});
   
        // console.log(allreplies);
        const rids = []

        
        // console.log(allreplies[0].issueid)
        // console.log(allreplies.length);
        
        for (let i = 0; i < allreplies.length; i++) {
            if(allreplies[i].issueid==id){
                rids.push(allreplies[i]._id)
            }
            else{
                continue;
            }
        }

        //
        //for null ones
        


    
        const forrid2 = []

        ////taking the _id of the replies that has {issueid: id}, into an array




        const as2 = []
        
        let size = rids.length

        for(let k=0; k<size; k++){
        const as = await replyModel.findById(rids[k])
            as2.push(as)
        
        }
        // console.log(as2[0])
        if(as2.length==0){
            as2.push(
                {
                    _id: new ObjectId(' '),
       
                  }
            )
        }
        
        



    //   console.log(users)

        return response.status(200).json(as2);

    } catch (error) {
     
    }
})


export default router;