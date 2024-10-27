import Swal from "sweetalert2";

export const SwalCustom = Swal.mixin({
    customClass: {
        popup: 'bg-white',
        confirmButton:
            'py-2 px-6 mx-3 bg-blue-500 hover:bg-bleu-700  rounded-md  hover:ease-in hover:duration-200 text-white',
        denyButton:
            'py-2 px-6 mx-3 bg-red-500    rounded-md text-white',
    },
    buttonsStyling: false,
    animation: true,
});
