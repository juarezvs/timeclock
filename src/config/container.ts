import { PrismaEmployeeRepository } from "../infra/repositories/PrismaEmployeeRepository";
import { CreateEmployee } from "../core/use-cases/CreateEmployee";
import { ListEmployees } from "../core/use-cases/ListEmployees";
import { PrismaClockRepository } from "../infra/repositories/PrismaClockRepository.ts";
import { CreateClock } from "../core/use-cases/CreateClock";
import { ListClocks } from "../core/use-cases/ListClocks";

const employeeRepo = new PrismaEmployeeRepository();

const clockRepo =  new PrismaClockRepository();

export const useCases = {
     // employess
     createEmployee: new CreateEmployee(employeeRepo),
     listEmployees: new ListEmployees(employeeRepo),
     //clocks
     createClock: new CreateClock(clockRepo),
     listClocks: new ListClocks(clockRepo),
}