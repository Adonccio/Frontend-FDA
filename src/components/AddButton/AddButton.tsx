import "./AddButton.css"
import {PlusIcon} from "../../assets/icons/PlusIcon";

interface ModalTriggerButtonProps {
    label: string;
    onOpen: () => void;
}

export default function AddButton({
                                               label,
                                               onOpen,
                                           }: ModalTriggerButtonProps) {

    return (
        <button className={`open-modal-button mb-4 d-flex align-items-center gap-2 bg-primary mt`} onClick={onOpen}>
            {<span><PlusIcon/></span>}
            {label}
        </button>
    );
}