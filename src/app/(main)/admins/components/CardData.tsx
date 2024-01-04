import { Categories } from '@/interfaces/Categories'
import React from 'react'
import { Admin as AdminInterface } from '@/interfaces/Admins'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Image, Input } from '@nextui-org/react'
import { EditIcon, PlusIcon, SearchIcon } from '@/components/Icons'
import ConfirmModal from '@/components/ConfirmModal'
import { useRouter } from 'next/navigation'

const CardUsers = ({ admins }: { admins: AdminInterface[] }) => {

  const [filterValue, setFilterValue] = React.useState("");
  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredAdmins = [...admins];
    if (hasSearchFilter) {
      // filteredUsers = filteredUsers.filter((user) =>
      //   user?.name!.toLowerCase().includes(filterValue.toLowerCase()),
      // );
      filteredAdmins = filteredAdmins.filter((admin) =>
        (admin?.name && admin.name.toLowerCase().includes(filterValue.toLowerCase())) ||
        (admin?.lastname && admin.lastname.toLowerCase().includes(filterValue.toLowerCase()))
      );
    }
    return filteredAdmins;
  }, [filterValue, admins]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const path = useRouter()

  return (
    <>
      <div className='flex justify-between items-center'>
        <Input
          isClearable
          classNames={{
            base: "w-full sm:max-w-[60%]",
            inputWrapper: "border-1",
          }}
          placeholder="Search by name or lastname..."
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue("")}
          onValueChange={onSearchChange}
        />
        <Button
          onClick={() => path.push("users/register")}
          className="bg-foreground text-background"
          endContent={<PlusIcon className="text-2xl" />}
          size="sm"
        >
          Add New
        </Button>
      </div>
      <div className='px-16 flex flex-col gap-5'>
        {
          filteredItems.map(admin => (
            <Card
              className='border-1 border-gray-500'
              key={admin.adminId}
              radius='sm'
            >
              <CardBody className='flex flex-col p-5'>
                <header className='flex justify-center'>
                  <Avatar
                    src={admin.image}
                    className="w-40 h-40 text-large"
                    radius='sm'
                  />
                </header>

                <div className='flex flex-col gap-3 px-2 pt-5'>
                  <div className='flex justify-between'>
                    <p className='text-bold text-small'>Name: </p> <span className=' text-small'>{admin.name}</span>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-bold text-small'>LastName: </p> <span className=' text-small'>{admin.lastname}</span>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-bold text-small'>Email: </p> <span className=' text-small'>{admin.email}</span>
                  </div>
                  <div className='flex justify-between'>
                    <p className='text-bold text-small'>Role: </p>
                    <Chip color={admin.role === 'USER' ? 'warning' : 'success'} className="capitalize" size="sm" variant="flat">
                      {admin.role}
                    </Chip>
                  </div>
                </div>

                <footer className='flex px-3 pt-3'>
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <Button className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:none" variant="light"
                      isIconOnly>
                      <EditIcon />
                    </Button>
                  </span>
                  <span className="text-lg text-danger cursor-pointer active:opacity-50">
                    <ConfirmModal type='admin' id={admin?.adminId!} name={`${admin?.name} ${admin?.lastname}`} />
                  </span>
                </footer>

              </CardBody>
            </Card>
          ))
        }
      </div>
    </>
  )
}

export default CardUsers