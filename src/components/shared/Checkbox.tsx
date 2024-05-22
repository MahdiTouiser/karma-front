import { Checkbox, Label } from "flowbite-react";
import React from 'react';

const KCheckbox = (props: { content: string, onChange: (checked: boolean) => void }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(event.target.checked);
    };

    return (
        <div className="flex max-w-md flex-col gap-4" id="checkbox">
            <div className="flex items-center gap-2">
                <Checkbox id="accept" onChange={handleChange} />
                <Label htmlFor="accept" className="flex">
                    {props.content}
                </Label>
            </div>
        </div>
    );
}

export default KCheckbox;
