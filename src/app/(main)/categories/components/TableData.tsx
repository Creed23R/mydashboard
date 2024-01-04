import React, { useMemo, useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  getKeyValue
} from '@nextui-org/table'
import { Pagination } from '@nextui-org/pagination'
import { Categories, CategoriesTable } from '@/interfaces/Categories'
import { Button, Input, Selection, Tooltip } from '@nextui-org/react'
import { DeleteIcon, EditIcon, PlusIcon, SearchIcon } from '@/components/Icons'
import ConfirmModal from '@/components/ConfirmModal'
import { useRouter } from 'next/navigation'
import ModalAddCategory from './ModalAddCategory'

const columns = [
  {
    key: "id_categoria",
    label: "ID",
  },
  {
    key: "categoria",
    label: "CATEGORIA",
  },
  {
    key: "acciones",
    label: "ACCIONES"
  }
];

const TableData = ({ categories }: { categories: Categories[] }) => {

  const path = useRouter()
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...categories];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((category) =>
        category?.categoria!.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    return filteredUsers;
  }, [filterValue, categories]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);


  const onClear = React.useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, [])




  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="Search by name of category..."
            size="sm"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <ModalAddCategory />
            {/* <Button
              onClick={() => path.push("/register")}
              className="bg-foreground text-background"
              endContent={<PlusIcon className="text-2xl" />}
              size="sm"
            >
              Add New
            </Button> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {items.length} users</span>
        </div>
      </div>
    );
  }, [
    filterValue,
    categories.length,
    hasSearchFilter
  ]);


  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["min-h-[422px]", "max-h-[382px]"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );


  const renderCell = React.useCallback((category: Categories, columnKey: any) => {

    switch (columnKey) {
      case "id_categoria":
        return (
          <p>{category.id_categoria}</p>
        );
      case "categoria":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{category.categoria}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p> */}
          </div>
        );
      case "acciones":
        return (
          <div className="relative flex items-center">

            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <Button className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:none" variant="light"
                onClick={() => {
                  // path.push(`/users/${user.id}`)
                  alert(category.id_categoria + ".- " + category.categoria)
                }}
                isIconOnly>
                <EditIcon />
              </Button>
            </span>


            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <ConfirmModal type='category' id={category?.id_categoria!} name={category?.categoria!} />
            </span>

          </div>
        );
      default:
        return columnKey;
    }
  }, []);

  return (
    <Table
      aria-label="Example empty table"
      topContent={topContent}
      bottomContent={bottomContent}
      classNames={classNames}
      removeWrapper
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.categoria}>
            {/* {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>} */}
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableData