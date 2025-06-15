import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getPaginationRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/router';
import { MdDeleteOutline } from "react-icons/md";
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { showDeleteConfirm } from '@/styles/DeleteConfirm';

const columnHelper = createColumnHelper();

export default function TruckTable() {
  const [trucks, setTrucks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleTogglePublish = async (truckId, newValue) => {

    try {
      await axios.put(`https://api.onlyheavy.com/api/category/isPulished/${truckId}`, {
        isPublished: newValue,
      });

      setTrucks((prev) =>
        prev.map((item) =>
          item._id === truckId ? { ...item, isPublished: newValue } : item
        )
      );
    } catch (error) {
      console.error('Error updating publish state:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = await showDeleteConfirm()
    if (!confirmed) return

    try {
      await axios.delete(`https://api.onlyheavy.com/api/category/deleteCategory/${id}`);
      setTrucks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting truck:', err);
      alert('Failed to delete truck.');
    }
  };

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get('https://api.onlyheavy.com/api/category/getCategory');
        setTrucks(response.data.success ? response.data.data : []);
        setError(null);
      } catch (err) {
        setTrucks([]);
        if (err.response?.status === 404) {
          setError('No data found');
        } else {
          console.error('Error fetching truck data:', err);
          setError('Something went wrong while fetching data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  const columns = useMemo(
    () => [
      columnHelper.accessor((_, index) => index + 1, {
        id: 'sno',
        header: 'S.No',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('categoryName', {
        header: 'Category',
        cell: (info) => <span className='capitalize'>{info.getValue()}</span>,
      }),
      columnHelper.accessor('brandName', {
        header: 'Brand',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('productName', {
        header: 'Product Name',
        cell: (info) => <span className='capitalize'>{info.getValue()}</span>,
      }),
      columnHelper.accessor('maxPrice', {
        header: 'Price',
        cell: (info) => `₹${info.getValue()}`,
      }),
      columnHelper.accessor('fuelType', {
        header: 'Fuel Type',
        cell: (info) => <span className='capitalize'>{info.getValue()}</span>,
      }),
      columnHelper.accessor('engineCC', {
        header: 'Engine (CC)',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('isPublished', {
        header: 'Publish',
        cell: (info) => {
          const truck = info.row.original;
          const currentValue = info.getValue();

          return (
            <Switch
              checked={currentValue}
              onCheckedChange={(newValue) => handleTogglePublish(truck._id, newValue)}
            />
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => {
          const truck = info.row.original;
          return (
            <div className="space-x-2 flex items-center justify-center gap-2 cursor-pointer">
              {/* 👇 Preview Icon */}
              <div
                onClick={() => {
                  if (truck.categorySlug && truck.slug) {
                    router.push(`/${truck.categorySlug}/${truck.slug}`);
                  } else {
                    alert("Missing categorySlug or slug");
                  }
                }}
                className=""
              >
                <FaEye className='w-5 h-5' />
              </div>

              {/* ✏️ Edit Icon */}
              <div
                onClick={() => router.push(`/admin/add-truck?id=${truck._id}`)}
                className="text-blue-600 hover:underline"
              >
                <FaRegEdit className='w-5 h-5' />
              </div>

              {/* 🗑️ Delete Icon */}
              <div
                onClick={() => handleDelete(truck._id)}
                className="text-red-600 hover:underline"
              >
                <MdDeleteOutline className='w-5 h-5' />
              </div>
            </div>
          );
        },
      }),

    ],
    []
  );

  const table = useReactTable({
    data: trucks,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination: {
        pageSize,
        pageIndex,
      },
      globalFilter: searchQuery,
    },
    onGlobalFilterChange: setSearchQuery,
    globalFilterFn: (row, columnId, filterValue) => {
      const categoryName = row.original.categoryName?.toLowerCase() || '';
      const productName = row.original.productName?.toLowerCase() || '';
      const searchValue = filterValue.toLowerCase();

      return categoryName.includes(searchValue) || productName.includes(searchValue);
    },
    onPaginationChange: (updater) => {
      const newState = updater({
        pageIndex,
        pageSize,
      });
      setPageIndex(newState.pageIndex);
      setPageSize(newState.pageSize);
    },
    manualPagination: false,
    pageCount: Math.ceil(trucks.length / pageSize),
  });

  // Calculate pagination values
  const { pageSize: currentPageSize } = table.getState().pagination;
  const total = trucks.length;
  const start = pageIndex * currentPageSize + 1;
  const end = Math.min((pageIndex + 1) * currentPageSize, total);

  if (isLoading) {
    return (
      <div className="mt-4 flex justify-center items-center h-32">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  const handleAddTruck = async () => {
    try {
      await router.push('/admin/add-truck');
    } catch (error) {

      window.location.href = '/admin/add-truck';
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4">
        <div className="flex gap-2">
          <button className="bg-orange-600 cursor-pointer text-white px-4 py-2 rounded-md">Live Trucks</button>
          <button className="bg-orange-50 cursor-pointer text-black px-4 py-2 rounded-md">Static Listings</button>
          <button className="bg-orange-50 cursor-pointer text-black px-4 py-2 rounded-md">Verified Trucks</button>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by category or product name..."
            className="w-[350px]  px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-orange-500 w-fit text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={handleAddTruck}
          >
            + Add Trucks
          </button>
        </div>
      </div>
      <div className="mb-4">

      </div>
      <div className="overflow-x-auto ">
        <table className="min-w-full rounded-lg border mt-4">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                  {error}
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="text-center border">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between text-sm mt-5">
          <div className="flex items-center gap-2">
            <span className="font-medium">Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                table.setPageSize(Number(e.target.value));
              }}
              className="border rounded px-2 py-1"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span className="italic text-gray-400">
              Showing {end - start + 1} of {total}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border px-2 py-1 rounded disabled:opacity-50"
            >
              {"<"}
            </button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border px-2 py-1 rounded disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
