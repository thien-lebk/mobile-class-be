/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { paramStringToJson } from 'src/lib/utils/util';
import {
  Repository,
  EntityRepository,
  getRepository,
  EntityManager,
  getConnection,
} from 'typeorm';
import { isNullOrUndefined } from 'util';
import { Customer } from './customer.entity';
import { GetAllCustomerDto } from './dto/get-all-customer.dto';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
 
 async getAllUser(transactionManager: EntityManager, getAllCustomerDto: GetAllCustomerDto): Promise<unknown> {
  const { page, filter, sorts, fullTextSearch } = getAllCustomerDto;
  let { perPage } = getAllCustomerDto;
  if (isNullOrUndefined(perPage)) {
    perPage = 25;
  }
  
  
  const query = transactionManager
    .getRepository(Customer)
    .createQueryBuilder('customer')
    .select([
      'customer.id',
      'customer.email',
      'customer.fullName',
      'customer.note',
      'customer.phoneNumber',
      'customer.sendTime',
    ]).where('customer.isDeleted is false')
    .take(perPage)
    .skip((page - 1) * perPage)
    .orderBy('customer.fullName', 'ASC');

  // Full text search
  if (!isNullOrUndefined(fullTextSearch) && fullTextSearch !== '') {
    query.andWhere(
      'LOWER(customer.email) LIKE LOWER(:email)',
      {
        email: `%${fullTextSearch}%`,
      },
    );
    query.orWhere(
      'LOWER(customer.fullName) LIKE LOWER(:fullName)',
      {
        full_name: `%${fullTextSearch}%`,
      },
    );
    query.orWhere(
      'LOWER(customer.note) LIKE LOWER(:note) ',
      {
        note: `%${fullTextSearch}%`,
      },
    );
    query.orWhere(
      'LOWER(customer.phoneNumber) LIKE LOWER(:phoneNumber) ',
      {
        phone_number: `%${fullTextSearch}%`,
      },
    );
    query.orWhere(
      'LOWER(customer.sendTime) LIKE LOWER(:sendTime) ',
      {
        send_time: `%${fullTextSearch}%`,
      },
    );
  }

  // Filter list
  if (!isNullOrUndefined(filter)) {
    const object = paramStringToJson(filter);
    if (!isNullOrUndefined(object.email)) {
      query.andWhere('LOWER(customer.email) LIKE LOWER(:email)', {
        email: `%${object.email}%`,
      });
    }

    if (!isNullOrUndefined(object.full_name)) {
      query.andWhere('LOWER(customer.fullName) LIKE LOWER(:fullName)', {
        full_name: `%${object.full_name}%`,
      });
    }

    if (!isNullOrUndefined(object.note)) {
      query.andWhere('LOWER(customer.note) LIKE LOWER(:note)', {
        note: `%${object.note}%`,
      });
    }
    if (!isNullOrUndefined(object.phone_number)) {
      query.andWhere('LOWER(customer.phoneNumber) LIKE LOWER(:phoneNumber)', {
        note: `%${object.phone_number}%`,
      });
    }
    if (!isNullOrUndefined(object.send_time)) {
      query.andWhere('LOWER(customer.sendTime) LIKE LOWER(:sendTime)', {
        note: `%${object.send_time}%`,
      });
    }
  }

  // Sort list
  if (!isNullOrUndefined(sorts)) {
    const object = paramStringToJson(sorts);


    if (!isNullOrUndefined(object.email)) {
      query.orderBy('customer.email', object.email);
    }

 
  }


  try {
    const data = await query.getMany();
    
  const total = await query.getCount();
  return { statusCode: 200, data: { data, total } };

  } catch (error) {
    console.log(error);
    
  }
  
 }
 async getUserById(transactionManager: EntityManager, id: string) {

  const query = transactionManager
    .getRepository(Customer)
    .createQueryBuilder('customer')
    .select([
      'customer.id',
      'customer.email',
      'customer.fullName',
      'customer.note',
      'customer.phoneNumber',
      'customer.sendTime',
    
    ])
    .andWhere('customer.id = :id', { id })
    .andWhere('customer.isDeleted = FALSE');

  const data = await query.getOne();

  if (isNullOrUndefined(data)) {
    throw new NotFoundException(`Không tìm thấy người dùng.`);
  }

  return { statusCode: 200, data };
}
 async   createCustomer(transactionEntityManager: any, createCustomerDto: any) {
  const { 
    email,
    fullName,
    note,
    phoneNumber,
    sendTime,
  } = createCustomerDto



  const customer = transactionEntityManager.create(Customer, {
    fullName: fullName,
    email: email,
    note: note,
    phoneNumber: phoneNumber,
    sendTime: sendTime,
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted :false
  });

 

  try {
    await transactionEntityManager.save(customer);
  } catch (error) {
    Logger.error(error);
    throw new InternalServerErrorException(
      'Lỗi hệ thống trong quá trình tạo khách hàng, vui lòng thử lại sau.',
    );
  }

  return customer;
    }
}
