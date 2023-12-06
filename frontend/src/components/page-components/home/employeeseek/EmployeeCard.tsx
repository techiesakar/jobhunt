import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardData = [
    {
        title: "Free company profile",
        content:
            "Proin fermentum risus id ipsum consectetur commodo. Aliquam condimentum fermentum purus non varius. Aliquam erat volutpat        ",
        hrefText: "Create company profile",
        image: "/employee1.jpg",
    },
    {
        title: "Eloquent job postings",
        content:
            "Proin fermentum risus id ipsum consectetur commodo. Aliquam condimentum fermentum purus non varius. Aliquam erat volutpat        ",
        hrefText: "Post a job",
        image: "/employee2.jpg",
    },
    {
        title: "Obtain candidates",
        content:
            "Proin fermentum risus id ipsum consectetur commodo. Aliquam condimentum fermentum purus non varius. Aliquam erat volutpat        ",
        hrefText: "Learn more",
        image: "/employee3.jpg",
    },
];

type PropsType = {
    className?: string
}
const EmployeeCard = (props: PropsType) => {
    type CardType = {
        title: string;
        image: string;
        content?: string;
        hrefText?: string;
        sakar?: string;
    }

    return (
        <>
            {CardData.map(({ title, image, content, hrefText, }: CardType) => {
                return (
                    <div className="shadow p-4 rounded-md bg-white flex flex-col">
                        <Image src={image} width={400} height={250} alt={title} />
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xl tracking-tight  font-bold">{title}</h2>
                            <p className={`text-gray-600 ${props.className}`}> {content}</p>
                            <Link
                                className="px-3 py-2  text-center hover:bg-gray-900 transition text-white bg-blue-700 rounded"
                                href="/submit-job"
                            >
                                {hrefText}
                            </Link>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default EmployeeCard;