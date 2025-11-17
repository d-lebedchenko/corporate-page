<script setup>
const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

const selectedDepartment = ref(
  typeof route.query.department === 'string'
    ? route.query.department
    : ''
)
const selectedLocation = ref(
  typeof route.query.location === 'string'
    ? route.query.location
    : ''
)

const { data: pageData, error: pageError } = await useFetch('/api/vacancies/main', {
  query: { locale: locale.value },
})

const { data: vacanciesData, error: vacanciesError } = await useFetch('/api/vacancies/all', {
  query: { locale: locale.value },
})

watchEffect(() => {
  if (pageError.value) showError(pageError.value)
  if (vacanciesError.value) showError(vacanciesError.value)
})

const vacancies = computed(() => vacanciesData.value?.docs || [])

const departments = computed(() => {
  const map = new Map()
  for (const v of vacancies.value) {
    if (v.department?.slug && !map.has(v.department.slug)) {
      map.set(v.department.slug, v.department)
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  )
})

const locations = computed(() => {
  const map = new Map()
  for (const v of vacancies.value) {
    if (!Array.isArray(v.locations)) continue
    for (const loc of v.locations) {
      if (loc?.slug && !map.has(loc.slug)) {
        map.set(loc.slug, loc)
      }
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    a.label.localeCompare(b.label)
  )
})

const departmentOptions = computed(() => [
  {
    value: '',
    label: $t('vacancies.any_department'),
  },
  ...departments.value.map((o) => ({
    value: o.slug,
    label: o.label,
  })),
])

const locationOptions = computed(() => [
  {
    value: '',
    label: $t('vacancies.any_location'),
  },
  ...locations.value.map((o) => ({
    value: o.slug,
    label: o.label,
  })),
])

const filteredVacancies = computed(() => {
  const dep = selectedDepartment.value || null
  const loc = selectedLocation.value || null

  return vacancies.value.filter((v) => {
    const depOk = !dep || v.department?.slug === dep
    const locOk = !loc || v.locations?.some((l) => l.slug === loc)
    return depOk && locOk
  })
})

const groupedVacancies = computed(() => {
  const map = new Map()

  for (const v of filteredVacancies.value) {
    const key = v.department?.slug || '_other'

    if (!map.has(key)) {
      map.set(key, {
        department: v.department || null,
        vacancies: [],
      })
    }

    map.get(key).vacancies.push(v)
  }

  return Array.from(map.values())
    .map((g) => ({
      ...g,
      vacancies: g.vacancies.sort((a, b) => {
        const dateA = new Date(a.publishedAt).getTime()
        const dateB = new Date(b.publishedAt).getTime()

        if (dateA !== dateB) return dateB - dateA
        return a.title.localeCompare(b.title)
      }),
    }))
    .sort((a, b) => {
      const aLabel = a.department?.label || ''
      const bLabel = b.department?.label || ''
      return aLabel.localeCompare(bLabel)
    })
})

watch([selectedDepartment, selectedLocation], ([dep, loc]) => {
  router.replace({
    query: {
      ...route.query,
      department: dep || undefined,
      location: loc || undefined,
    },
  })
})
</script>

<template>
  <section class="vacancies-page">
    <div
      v-if="pageData?.hero?.length"
      class="vacancies-page__hero"
    >
      <RenderBloks :blocks="pageData.hero" />
    </div>

    <div class="vacancies-page__body">
      <div class="container">
        <div class="vacancies-page__filters">
          <UiSelect
            class="vacancies-page__filters-item"
            v-model="selectedDepartment"
            :options="departmentOptions"
          />

          <UiSelect
            class="vacancies-page__filters-item"
            v-model="selectedLocation"
            :options="locationOptions"
          />
        </div>

        <div class="vacancies-page__result">
          <div
            v-if="!groupedVacancies.length"
            class="vacancies-page__empty f-p2"
          >
            {{ $t('vacancies.not_found') }}
          </div>
    
          <div
            v-else
            class="vacancies-page__groups"
          >
            <VacanciesGroup
              v-for="group in groupedVacancies"
              :key="group.department?.id || '_other'"
              :data="group"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use "@/assets/scss/media" as *;
@use "@/assets/scss/functions" as *;

.vacancies-page {
  background-color: $c-black;
  color: $c-white;

  &__body {
    padding-top: 70px;
    padding-bottom: 140px;
    @include respond("tab") {
      padding-top: 40px;
      padding-bottom: 40px;
    }
    @include respond("mob") {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }

  &__filters {
    display: flex;
    gap: 40px;
    margin-bottom: 60px;
    @include respond("tab") {
      gap: 12px;
      margin-bottom: 48px;
    }
    @include respond("mob") {
      display: block;
    }

    &-item {
      flex: 0 0 percent-width-with-gap(2, 40px);
      @include respond("tab") {
        flex-basis: percent-width-with-gap(2, 12px);
      }

      &:not(:last-child) {
        @include respond("mob") {
          margin-bottom: 12px;
        }
      }
    }
  }
}
</style>
