interface Employee {
  detail(responsibility : string[]) : void 
}

class Manager implements Employee {
  detail(responsibility: string[]): void {
      responsibility.forEach((r)=> console.log(`[mgr]- ${r}`))
  }
}

class Developer implements Employee {
  detail(responsibility: string[]): void {
      responsibility.forEach((d)=>console.log(`[dev]- ${d}`))
  }
}

function PrintDetail(employee : Employee, duty : string[]): void {
  employee.detail(duty)
}


const developer = new Developer()
const manager = new Manager()

PrintDetail(manager, ["manage Empleyee", "coordinate the company operations"])
PrintDetail(developer, ["develop New Systems", "maintain the existing systems"])