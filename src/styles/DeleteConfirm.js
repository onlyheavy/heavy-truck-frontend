
import Swal from 'sweetalert2';

export const showDeleteConfirm = async () => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this item!',
    // icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#F7374F',
    cancelButtonColor: '#2A4759',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
  });

  return result.isConfirmed;
};
