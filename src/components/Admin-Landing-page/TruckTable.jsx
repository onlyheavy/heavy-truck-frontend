"use client";
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
import API from '@/utils/api';
import Link from 'next/link';

const columnHelper = createColumnHelper();

export default function TruckTable() {
  const [trucks, setTrucks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [subCategoryOption, setSubCategoryOption] = useState('');
  const [productData, setProductData] = useState([])
  const [selectedProduct, setSelectedProduct] = useState("")
  const router = useRouter();
  console.log(selectedProduct)
  const handleTogglePublish = async (truckId, newValue) => {
    try {
      await axios.put(`${API.HOST}/api/category/isPulished/${truckId}`, {
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
  // 
  const handleDelete = async (id) => {
    const confirmed = await showDeleteConfirm()
    if (!confirmed) return

    try {
      await axios.delete(`${API.HOST}/api/category/deleteCategory/${id}`);
      setTrucks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting truck:', err);
      alert('Failed to delete truck.');
    }
  };

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get(`${API.HOST}/api/category/getCategory`);
        setTrucks(response?.data?.success ? response?.data?.data : []);
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

  const productNameFilter = async () => {
    try {
      const response = await axios.get(`${API.HOST}/api/category/getProductNamesByAdmin?brandSlug=${selectedOption}&subCategorySlug=${subCategoryOption}`);
      setProductData(response?.data?.success ? response?.data?.data : []);

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

  const brancdFilter = async () => {
    try {
      const response = await axios.get(`${API.HOST}/api/category/getBrandFilterData?brandSlug=${selectedOption}&subCategorySlug=${subCategoryOption}`);
      setTrucks(response?.data?.success ? response?.data?.data : []);
      setError(null);
    } catch (err) {
      setTrucks([]);
      setProductData([])
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

  const productFilterData = async () => {
    try {
      const response = await axios.get(`${API.HOST}/api/category/getDataByIdByAdmin/${selectedProduct}`);
      setTrucks(response?.data?.success ? response?.data?.data : []);
      setError(null);
    } catch (err) {
      setTrucks([]);
      setProductData([])
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

  useEffect(() => {
    // If neither selectedOption nor subCategoryOption is selected, do nothing
    if (!selectedOption && !subCategoryOption) return;

    // If selectedOption is selected → run both

    brancdFilter();
    productNameFilter();

  }, [selectedOption, subCategoryOption]);


  useEffect(() => {
    if (selectedProduct) {
      productFilterData();
    }

  }, [selectedProduct]);
  // Add cleanup effect
  useEffect(() => {
    return () => {
      localStorage.removeItem('currentSpecId');
    };
  }, []);

  const productOptions = [
    { value: "", label: "Product Name" },
    ...productData.map((item) => ({
      value: item._id,
      label: item.productName,
    })),

  ];

  const columns = [
    columnHelper.accessor((_, index) => index + 1, {
      id: 'sno',
      header: 'S.No',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('categoryName', {
      header: 'Category',
      cell: (info) => <span className='capitalize'>{info.getValue()}</span>,
    }),
    columnHelper.accessor('subCategory', {
      header: <div className="">
        <select
          className="rounded px-1 py-0.5 text-sm outline-none"
          value={subCategoryOption}
          onChange={(e) => setSubCategoryOption(e.target.value)}
        >
          <option value="">Sub Category</option>
          <option value="mini-trucks">Mini Trucks</option>
          <option value="medium-trucks">Medium Trucks</option>
          <option value="medium-tipper">Medium Tipper</option>
          <option value="heavy-trucks">Heavy Trucks</option>
          <option value="heavy-tipper">Heavy Tipper</option>
          <option value="trailers">Trailers</option>
          <option value="mixers">Mixers</option>
          <option value="bulkers">Bulkers</option>

        </select>
      </div>,
      cell: (info) => <span className='capitalize'>{info.getValue()}</span>,
    }),
    columnHelper.accessor('brandName', {
      header: <div className="">
        <select
          className="rounded px-1 py-0.5 text-sm outline-none"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Brand</option>
          <option value="ashok-leyland">Ashok Leyland</option>
          <option value="bharatbenz">BharatBenz</option>
          <option value="blue-energy-motors">Blue Energy Motors</option>
          <option value="e-trio">E-Trio</option>
          <option value="eicher">Eicher</option>
          <option value="eka">EKA</option>
          <option value="erisha-e-mobility">Erisha E Mobility</option>
          <option value="euler-ev">Euler EV</option>
          <option value="evage-motors">Evage Motors</option>
          <option value="force-motors">Force Motors</option>
          <option value="i-board-mobility">I-Board Mobility</option>
          <option value="ipl-tech-electric">IPL Tech Electric</option>
          <option value="isuzu">ISUZU</option>
          <option value="jupiter-electric-mobility">Jupiter Electric Mobility</option>
          <option value="kamaz">Kamaz</option>
          <option value="mahindra">Mahindra</option>
          <option value="man">Man</option>
          <option value="maruti-suzuki">Maruti Suzuki</option>
          <option value="montra-electric">Montra Electric</option>
          <option value="omega">Omega</option>
          <option value="premier-motors">Premier Motors</option>
          <option value="propal">Propal</option>
          <option value="sany">Sany</option>
          <option value="scania">Scania</option>
          <option value="sml-isuzu">SML ISUZU</option>
          <option value="switch-mobility">Switch Mobility</option>
          <option value="tata-motors">Tata Motors</option>
          <option value="toyota">Toyota</option>
          <option value="triton-ev">Triton EV</option>
          <option value="volvo">Volvo</option>

        </select>
      </div>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("productName", {
      header: () => (
        <select
          className="rounded px-1 py-0.5 text-sm outline-none"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          {productOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ),
      cell: (info) => <span className="capitalize">{info.getValue()}</span>,
    }),
    columnHelper.accessor('fuelType', {
      header: 'Fuel Type',
      cell: (info) => <span className='capitalize'>{info.getValue()}</span>,
    }),
    columnHelper.accessor('country', {
      header: 'Country',
      cell: (info) => `${info.getValue()} `,
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
            <div>
              <Link
                href={truck.categorySlug && truck.slug ? `/${truck.categorySlug}/${truck.slug}` : '#'}
                passHref
                legacyBehavior
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (!truck.categorySlug || !truck.slug) {
                      e.preventDefault();
                      alert("Missing categorySlug or slug");
                    }
                  }}
                >
                  <FaEye className='w-5 h-5' />
                </a>
              </Link>
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

  ]

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
    <div className="mt-8 bg-white">
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
            className="w-[350px]  px-4 py-2 text-gray-600 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <table className="min-w-full text-black rounded-lg border mt-4">
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
        <div className="flex items-center text-black justify-between text-sm mt-5">
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
