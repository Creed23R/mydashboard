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
import { Button, Chip, Input, Selection, Tooltip, User } from '@nextui-org/react'
import { DeleteIcon, EditIcon, PlusIcon, SearchIcon } from '@/components/Icons'
import ConfirmModal from '@/components/ConfirmModal'
import { User as UserInterface } from '@/interfaces/User'
import { useRouter } from 'next/navigation'

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "email",
    label: "EMAIL",
  },
  {
    key: "role",
    label: "ROLE"
  },
  {
    key: "acciones",
    label: "ACCIONES"
  }
];


const TableData = ({ users }: { users: UserInterface[] }) => {

  const path = useRouter()

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (hasSearchFilter) {
      // filteredUsers = filteredUsers.filter((user) =>
      //   user?.name!.toLowerCase().includes(filterValue.toLowerCase()),
      // );
      filteredUsers = filteredUsers.filter((user) =>
        (user?.name && user.name.toLowerCase().includes(filterValue.toLowerCase())) ||
        (user?.lastname && user.lastname.toLowerCase().includes(filterValue.toLowerCase()))
      );
    }
    return filteredUsers;
  }, [filterValue, users]);

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
            placeholder="Search by name or lastname..."
            size="md"
            startContent={<SearchIcon className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <ModalRegisterForm /> */}
            <Button
              onClick={() => path.push("users/register")}
              className="bg-foreground text-background"
              endContent={<PlusIcon className="text-2xl" />}
              size="sm"
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
        </div>
      </div>

    );
  }, [
    filterValue,
    users.length,
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


  const renderCell = React.useCallback((user: UserInterface, columnKey: any) => {

    // console.log(columnKey);

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "md", size: "sm", src: user.image }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.id}
            name={`${user.name} ${user.lastname}`}
          >
            <p className="text-bold text-small capitalize">
              {user?.name!.toUpperCase()}
            </p>
          </User>
        );
      case "email":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.email}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p> */}
          </div>
        );
      case "role":
        return (
          <Chip className="capitalize" color={user.role === 'USER' ? 'warning' : 'success'} size="sm" variant="flat">
            {user.role}
          </Chip>
        );
      case "acciones":
        return (
          <div className="relative flex items-center">

            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              {/*<ModalUpdateForm user={user} />*/}
              <Button className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:none" variant="light"
                onClick={() => {
                  path.push(`/users/${user.id}`)
                }}
                isIconOnly>
                <EditIcon />
              </Button>
            </span>

            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <ConfirmModal type='user' id={user?.id!} name={`${user?.name} ${user?.lastname}`} />
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
          <TableRow key={item.email}>
            {/* {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>} */}
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default TableData