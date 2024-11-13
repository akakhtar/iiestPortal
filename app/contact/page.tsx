import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Contact() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                    Contact Us
                </h2>
                <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                  Feel free to reach out to us with any question. We are here to assist you!
                </p>
                <form action="#" className="space-y-8">
                <div>
                        <label 
                            htmlFor="name" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Your Name
                        </label>
                        <input 
                            type="text" 
                            id="name" 
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                            placeholder="Rahul Kumar" 
                            required
                        />
                    </div>
                    <div>
                        <label 
                            htmlFor="email" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Your email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                            placeholder="name@flowbite.com" 
                            required
                        />
                    </div>
                    <div>
                        <label 
                            htmlFor="subject" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            Subject
                        </label>
                        <input 
                            type="text" 
                            id="subject" 
                            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" 
                            placeholder="Let us know how we can help you" 
                            required
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label 
                            htmlFor="message" 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                        >
                            Your message
                        </label>
                        <textarea 
                            id="message" 
                            rows={6} 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                            placeholder="Leave a comment..."
                        ></textarea>
                    </div>
                    <Button type="submit">Send Message</Button>
                </form>

                <div className="mt-16">
                    <h3 className="text-2xl font-extrabold text-center text-gray-900 dark:text-white mb-6">Our Contact Details</h3>
                    
                    <div className="text-center mb-4">
                        <h2 className="text-lg font-bold mb-4">Website</h2>
                           <Link href={"https://www.iiests.ac.in/"} className="text-blue-600 hover:text-blue-800 hover:underline">www.iiests.ac.com</Link>
                    </div>

                    <div className="text-center mb-4">
                    <h2 className="text-lg font-bold mb-4">Social Media</h2>
                        <div className="flex justify-center space-x-4">
                            <Link href={"https://www.iiests.ac.in/"} className="text-blue-600 hover:text-blue-800 hover:underline">Instagram</Link>
                            <Link href={"https://www.iiests.ac.in/"} className="text-blue-600 hover:text-blue-800 hover:underline">Facebook</Link>
                            <Link href={"https://www.iiests.ac.in/"} className="text-blue-600 hover:text-blue-800 hover:underline">Twitter</Link>
                        </div>
                    </div>

                    <div className="text-center mb-4">
                    <h2 className="text-lg font-bold mb-4">Phone</h2>
                        <p className="text-gray-900 dark:text-white">+91 8123456789</p>
                    </div>

                    <div className="text-center mb-4">
                    <h2 className="text-lg font-bold mb-4">Address</h2>
                        <p className="text-gray-900 dark:text-white">
                            Indian Institute of Engineering Science and Technology (IIEST), Shibpur, <br />
                            P.O. Indian Institute of Engineering Science and Technology, Shibpur, <br />
                            Howrah, West Bengal, India, 711103.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
