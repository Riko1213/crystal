import prisma from '@/libs/prismadb'

interface IParams{
    email?: string
}

export default async function getUserByEmail(params: IParams){
    try {
        const {email} = params;
        
        const user = await prisma.user.findUnique({
            where:{
                email: email
            }, 
        })

        if(!user){
            return null;
        }
        return user;
    } catch (error: any) {
        throw new Error(error)
    }
}