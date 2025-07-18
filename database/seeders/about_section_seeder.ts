import { BaseSeeder } from '@adonisjs/lucid/seeders'
import AboutSection from '#models/about_section'

export default class extends BaseSeeder {
  async run() {
    await AboutSection.truncate()
    await AboutSection.create({
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet mauris quis neque feugiat mattis condimentum in felis. Donec fringilla quam nec lectus tempor gravida. Ut congue arcu ex, a egestas est sagittis a. Maecenas tristique quis lectus sodales tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam id dictum orci. Duis maximus pellentesque mauris sed laoreet. Donec vulputate sit amet urna in luctus. Pellentesque urna dolor, facilisis non justo sit amet, dignissim posuere lorem. Morbi eget felis finibus, aliquam lorem ac, rutrum lectus. Sed malesuada auctor lacus gravida faucibus. Ut et molestie magna. Maecenas auctor efficitur odio vitae pretium. Integer fringilla auctor accumsan. Ut volutpat cursus interdum. Phasellus auctor sagittis mauris, at ultrices dui euismod sit amet. Integer varius nibh vitae velit lobortis iaculis. Mauris tristique tortor sed viverra mattis. Suspendisse varius sodales ligula, sit amet venenatis mi dictum at. Donec iaculis orci non eleifend tristique. Vivamus a vulputate justo. Sed rhoncus posuere purus mollis congue. Fusce rhoncus tellus sed nisi consectetur suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam vitae dolor fringilla, fringilla nunc sit amet, gravida metus. Phasellus semper egestas convallis. Sed a massa lorem. Maecenas non egestas justo, a maximus risus. Donec in nunc laoreet, egestas ante eget, porta leo. Donec fringilla gravida sapien sollicitudin pretium. Cras porta tempor suscipit. Duis efficitur ante sit amet sem gravida tempus. Aenean vitae fermentum sapien. Donec venenatis varius aliquam. Ut sit amet vestibulum nibh. Quisque ut ante ut nulla sollicitudin placerat. Quisque cursus accumsan facilisis. Suspendisse eget vulputate tortor. Vivamus tempor tortor nec vehicula facilisis. Praesent nunc eros, molestie et quam id, suscipit rutrum orci. In et dignissim mi, sed rhoncus ante. Donec finibus fermentum est, at auctor erat auctor vitae. Duis a dolor bibendum, commodo erat in, pharetra nulla. Praesent et placerat erat.',
      buttonPrimaryText: 'CONHEÇA MAIS SOBRE O EVENTO',
      buttonSecondaryText: 'CONHEÇA OS EXPOSITORES',
    })
  }
}
